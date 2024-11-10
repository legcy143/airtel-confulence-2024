"use client";
import { EventDetail } from "@/constants/EventDetail";
import { Button, Divider, Tab, Tabs } from "@nextui-org/react";
import React, { Suspense } from "react";
import AdminTabs from "./_tabs/AdminTabs";

export default function page() {
  return (
    <main className="overflow-y-auto h-full">
      <nav className="px-1 md:px-5 border-b-0 h-[5rem] flex items-center justify-between sticky top-0 backdrop-blur-xl z-30">
        <div className="h-[90%]">
          <img src={EventDetail.logo.lg} className="h-full" alt="" />
        </div>
        <div />
      </nav>
      <Divider />
      <main className="p-2">
        <Suspense fallback={"loading..."}>
          <AdminTabs />
        </Suspense>
      </main>
    </main>
  );
}
