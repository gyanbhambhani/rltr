"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

type OrbProps = {
  color: string; // Tailwind color class e.g., 'bg-cyan-400/40'
  size: number; // pixels
  initial: { x: number; y: number };
  className?: string;
};

export default function Orb({ color, size, initial, className }: OrbProps) {
  const mx = useMotionValue(initial.x);
  const my = useMotionValue(initial.y);

  // Damped spring for cursor-follow
  // Softer, lower-power motion
  const sx = useSpring(mx, { damping: 40, stiffness: 90, mass: 0.8 });
  const sy = useSpring(my, { damping: 40, stiffness: 90, mass: 0.8 });

  const x = useTransform(sx, (v) => `${v}px`);
  const y = useTransform(sy, (v) => `${v}px`);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalize -1..1
      const nx = e.clientX / innerWidth - 0.5;
      const ny = e.clientY / innerHeight - 0.5;
      // Parallax scale
      mx.set(initial.x + nx * 16);
      my.set(initial.y + ny * 16);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [initial.x, initial.y, mx, my]);

  return (
    <motion.div
      aria-hidden
      className={`rounded-full blur-3xl pointer-events-none ${color} ${className ?? ""}`}
      style={{ width: size, height: size, x, y }}
    />
  );
}


