"use client";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  return (
    <main>
      <Link className="m-5" href={"/admin"}>
        <Button>Admin</Button>
      </Link>
    </main>
  );
}
