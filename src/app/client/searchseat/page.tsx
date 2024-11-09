"use client";
import { EventDetail } from "@/constants/EventDetail";
import { Button, Divider, Input, Tab, Tabs } from "@nextui-org/react";
import React from "react";
import { Icon } from "@iconify/react";

export default function page() {
  return (
    <main>
      <nav className="px-1 md:px-5 border-b-0 h-[5rem] flex items-center justify-between sticky top-0 backdrop-blur-xl z-30">
        <div className="h-[90%]">
          <img src={EventDetail.logo.lg} className="h-full" alt="" />
        </div>
        <div>
          <p className="font-semibold opacity-80 text-xl hidden md:block">
            Table Locater
          </p>
        </div>
      </nav>
      <Divider />
      <main className="p-2 max-w-[50rem] mx-auto">
        <Input
          type="search"
          startContent={<Icon icon="ic:round-search" />}
          label="Search seat"
          description="search your seat by email or name "
          placeholder="Name or Email ..."
        />
      </main>
    </main>
  );
}
