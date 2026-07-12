"use client";

import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";
import { Attribute } from "next-themes";
import React, { useState, useEffect } from "react";
import { ScreenLoader } from "./screenLoader";
import Image from "next/image";

const scriptProps =
  typeof window === "undefined"
    ? undefined
    : ({ type: "application/json" } as const);

interface PropsTypes {
  children: React.ReactNode;
  attribute: Attribute;
  defaultTheme: "light" | "dark";
  enableSystem: boolean;
  scriptProps: typeof scriptProps;
}

export default function ThemeProvider({
  children,
  attribute,
  defaultTheme,
  enableSystem,
  scriptProps,
}: PropsTypes) {
  const prop = { attribute, defaultTheme, enableSystem, scriptProps };
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  });

  if (!isMounted) {
    return (
      <ScreenLoader
        message="Loading App"
        Image={
          <Image
            alt="Gr tech logo"
            src="/images/gr-tech-bgless-logo.png"
            width={65}
            height={65}
            className="w-40"
          />
        }
      />
    );
  }
  return <NextThemeProvider {...prop}>{children}</NextThemeProvider>;
}
