"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

export default function Home() {
  return (
    <main>
      <Button onClick={()=>{
        toast.success("ye it's work")
      }}>toat check</Button>
      <Link href={"/admin"}>
        <Button>Admin</Button>
      </Link>
    </main>
  );
}
