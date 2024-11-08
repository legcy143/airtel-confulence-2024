"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <main>
      <Link href={"/admin"}>
        <Button>Admin</Button>
      </Link>
    </main>
  );
}
