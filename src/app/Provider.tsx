"use client";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import { Toaster } from "sonner";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <Toaster richColors position="top-center" />
      {children}
    </NextUIProvider>
  );
}
