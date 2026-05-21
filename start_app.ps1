#requires -Version 5.1
<#
.SYNOPSIS
    Start PeakPath: kill any running server on port 3000 + any cloudflared process,
    build if needed, then launch `npm start` and a Cloudflare quick tunnel in their
    own PowerShell windows. Prints the public trycloudflare URL when ready.

.NOTES
    Safe to re-run — it kills existing instances first.
    Close the spawned PowerShell windows to stop the server and tunnel.
#>

$ErrorActionPreference = 'Stop'

# Run from the script's own directory regardless of where the user invoked it from.
$root = $PSScriptRoot
if (-not $root) { $root = (Get-Location).Path }
Set-Location $root

$port    = 3000
$logFile = Join-Path $root 'cloudflared.log'

function Write-Banner($text) {
    Write-Host ""
    Write-Host "=== $text ===" -ForegroundColor Cyan
}

# ----------------------------------------------------------------------
# 1. Kill whatever is holding port 3000
# ----------------------------------------------------------------------
Write-Banner "Stopping existing instances"

$conn = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1
if ($conn) {
    $procId = $conn.OwningProcess
    Write-Host "Port ${port}: stopping process $procId"
    try { Stop-Process -Id $procId -Force -ErrorAction Stop } catch { Write-Host "  (already gone)" -ForegroundColor DarkGray }
    Start-Sleep -Seconds 1
} else {
    Write-Host "Port ${port}: already free"
}

# ----------------------------------------------------------------------
# 2. Kill any existing cloudflared
# ----------------------------------------------------------------------
$tunnels = Get-Process cloudflared -ErrorAction SilentlyContinue
if ($tunnels) {
    foreach ($t in $tunnels) {
        Write-Host "cloudflared: stopping PID $($t.Id)"
        try { Stop-Process -Id $t.Id -Force -ErrorAction Stop } catch {}
    }
    Start-Sleep -Seconds 1
} else {
    Write-Host "cloudflared: no existing process"
}

if (Test-Path $logFile) { Remove-Item $logFile -Force }

# ----------------------------------------------------------------------
# 3. Build if no .next exists
# ----------------------------------------------------------------------
$buildIdFile = Join-Path $root '.next\BUILD_ID'
if (-not (Test-Path $buildIdFile)) {
    Write-Banner "No .next build found - running npm run build"
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Build failed" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "Using existing .next build (delete .next/ to force rebuild)" -ForegroundColor DarkGray
}

# ----------------------------------------------------------------------
# 4. Start npm start in a new PowerShell window
# ----------------------------------------------------------------------
Write-Banner "Starting Next.js production server"
$serverCmd = "Set-Location '$root'; `$host.UI.RawUI.WindowTitle = 'PeakPath - server'; Write-Host '[PeakPath] npm start' -ForegroundColor Cyan; npm start"
Start-Process -FilePath 'powershell' -ArgumentList @('-NoExit', '-Command', $serverCmd) | Out-Null

# ----------------------------------------------------------------------
# 5. Wait for port 3000 to listen
# ----------------------------------------------------------------------
Write-Host "Waiting for port ${port}..." -NoNewline
$waited = 0
while ($waited -lt 30) {
    if (Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue) {
        Write-Host " ready" -ForegroundColor Green
        break
    }
    Start-Sleep -Seconds 1
    Write-Host '.' -NoNewline
    $waited++
}
if ($waited -ge 30) {
    Write-Host " timed out" -ForegroundColor Red
    Write-Host "Check the server window for errors." -ForegroundColor Red
    exit 1
}

# ----------------------------------------------------------------------
# 6. Start cloudflared in a new PowerShell window, tee to log
# ----------------------------------------------------------------------
Write-Banner "Starting Cloudflare quick tunnel"
$tunnelCmd = "Set-Location '$root'; `$host.UI.RawUI.WindowTitle = 'PeakPath - tunnel'; Write-Host '[PeakPath] cloudflared tunnel' -ForegroundColor Cyan; cloudflared tunnel --url http://localhost:$port 2>&1 | Tee-Object -FilePath '$logFile'"
Start-Process -FilePath 'powershell' -ArgumentList @('-NoExit', '-Command', $tunnelCmd) | Out-Null

# ----------------------------------------------------------------------
# 7. Poll the log file for the trycloudflare URL
# ----------------------------------------------------------------------
Write-Host "Waiting for tunnel URL..." -NoNewline
$url = $null
$waited = 0
while ($waited -lt 30) {
    if (Test-Path $logFile) {
        $content = Get-Content $logFile -Raw -ErrorAction SilentlyContinue
        if ($content -and ($content -match 'https://[a-zA-Z0-9-]+\.trycloudflare\.com')) {
            $url = $matches[0]
            break
        }
    }
    Start-Sleep -Seconds 1
    Write-Host '.' -NoNewline
    $waited++
}
Write-Host ""

# ----------------------------------------------------------------------
# 8. Print result
# ----------------------------------------------------------------------
Write-Host ""
if ($url) {
    Write-Host "------------------------------------------------------------" -ForegroundColor Cyan
    Write-Host "  PeakPath is live" -ForegroundColor Cyan
    Write-Host "------------------------------------------------------------" -ForegroundColor Cyan
    Write-Host "  Local:  " -NoNewline; Write-Host "http://localhost:$port" -ForegroundColor White
    Write-Host "  Public: " -NoNewline; Write-Host $url               -ForegroundColor Yellow
    Write-Host "------------------------------------------------------------" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Server window: 'PeakPath - server'  (close to stop npm)"
    Write-Host "Tunnel window: 'PeakPath - tunnel'  (close to stop tunnel)"
    Write-Host "Tunnel log:    $logFile"
    Write-Host ""

    # Also drop URL into clipboard for convenience
    try {
        $url | Set-Clipboard
        Write-Host "(URL copied to clipboard)" -ForegroundColor DarkGray
    } catch {}
} else {
    Write-Host "Tunnel did not produce a URL within 30s." -ForegroundColor Red
    Write-Host "Check the 'PeakPath - tunnel' window or $logFile" -ForegroundColor Red
    exit 1
}
