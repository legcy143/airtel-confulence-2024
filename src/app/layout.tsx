import type { Metadata } from "next";
import "./globals.css";
import Provider from "./Provider";
import { EventDetail } from "@/constants/EventDetail";

export const metadata: Metadata = {
  title: "Airtel Confulence",
  description: "Airtel Confulence 2024",
  icons: {
    icon: EventDetail.logo.favicon,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
