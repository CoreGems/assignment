"use client";

import { animate, useMotionValue, useTransform, motion } from "framer-motion";
import { useEffect } from "react";

type Props = {
  to: number;
  duration?: number;
  delay?: number;
  format?: (n: number) => string;
  className?: string;
};

export function AnimatedCounter({
  to,
  duration = 1.0,
  delay = 0,
  format = (n) => Math.round(n).toLocaleString("en-US"),
  className,
}: Props) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => format(latest));

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [count, to, duration, delay]);

  return (
    <motion.span className={className}>
      {rounded}
    </motion.span>
  );
}
