import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="w-full h-screen bg-cover bg-center bg-[url('/assets/airtel-bg.jpg')]"
    >
      {children}
    </main>
  );
}
