"use client";

import Image from "next/image";
import React, { ReactElement } from "react";
import { useTheme } from "next-themes";
import { themePalette } from "@/lib/palette";

interface ScreenLoaderProps {
  message?: string;
  Image: React.ReactNode;
}

export function ScreenLoader({
  message = "Loading secure connection...",
  Image,
}: ScreenLoaderProps) {
  const { theme } = useTheme();
  return (
    <div
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center transition-all duration-500 ${themePalette.dark.bg_secondary}`}
    >
      {/* Centered Logo Container */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Animated Wrapper Box using our custom Tailwind utility */}
        <div className="w-40 animate-logo-pulse pointer-events-none select-none">
          {Image}
        </div>

        {/* Ambient background glow behind the logo */}
        <div className="absolute -z-10 w-32 h-32 bg-blue-500/10 dark:bg-emerald-500/10 blur-2xl rounded-full animate-pulse duration-1000" />
      </div>

      {/* Optional loading text description below the logo */}
      {message && (
        <p className="mt-8 text-sm font-medium tracking-wide text-slate-500 dark:text-slate-400 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
