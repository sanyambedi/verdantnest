"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: number;
  className?: string;
  /** If true, renders the logo in white (for dark backgrounds like the footer) */
  inverted?: boolean;
}

export const Logo = ({ size = 40, className, inverted = false }: LogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-label="VerdantNest Logo"
    >
      <circle cx="50" cy="50" r="48" fill={inverted ? "white" : "#3DAE5A"} />
      <path
        d="M55 25C55 25 38 35 32 52C28 63 32 72 40 76C48 80 56 76 60 68C66 56 62 42 55 25Z"
        stroke={inverted ? "#3DAE5A" : "white"}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M46 72C46 72 44 58 50 46C54 38 55 30 55 25"
        stroke={inverted ? "#3DAE5A" : "white"}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};
