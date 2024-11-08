"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import React from "react";
import { Toaster } from "sonner";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ThemeProvider attribute={'class'} defaultTheme="dark">
      <Toaster richColors position="top-center" />
      {children}
      </ThemeProvider>
    </NextUIProvider>
  );
}
