"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type PersonaId = "alex" | "maya";

export type Persona = {
  id: PersonaId;
  firstName: string;
  lastName: string;
  fullName: string;
  pronouns: { subject: string; object: string; possessive: string };
  avatarSrc: string;
};

export const personas: Record<PersonaId, Persona> = {
  alex: {
    id: "alex",
    firstName: "Alex",
    lastName: "Chen",
    fullName: "Alex Chen",
    pronouns: { subject: "he", object: "him", possessive: "his" },
    avatarSrc: "/avatars/alex.svg",
  },
  maya: {
    id: "maya",
    firstName: "Maya",
    lastName: "Patel",
    fullName: "Maya Patel",
    pronouns: { subject: "she", object: "her", possessive: "her" },
    avatarSrc: "/avatars/maya.svg",
  },
};

type PersonaContextValue = {
  personaId: PersonaId;
  persona: Persona;
  setPersona: (id: PersonaId) => void;
};

const PersonaContext = createContext<PersonaContextValue | null>(null);

const STORAGE_KEY = "peakpath-persona";

export function PersonaProvider({ children }: { children: React.ReactNode }) {
  const [personaId, setPersonaIdState] = useState<PersonaId>("alex");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "alex" || stored === "maya") {
        setPersonaIdState(stored);
      }
    } catch {
      // localStorage unavailable — keep default
    }
  }, []);

  const setPersona = useCallback((id: PersonaId) => {
    setPersonaIdState(id);
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // ignore
    }
  }, []);

  return (
    <PersonaContext.Provider
      value={{ personaId, persona: personas[personaId], setPersona }}
    >
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const ctx = useContext(PersonaContext);
  if (!ctx) {
    throw new Error("usePersona must be used inside PersonaProvider");
  }
  return ctx;
}
