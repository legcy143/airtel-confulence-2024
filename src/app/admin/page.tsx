"use client";
import { EventDetail } from "@/constants/EventDetail";
import { Button, Divider, Tab, Tabs } from "@nextui-org/react";
import React from "react";
import { Icon } from "@iconify/react";
import Users from "./_tabs/Users";
import Tables from "./_tabs/Tables";
import SwapUser from "./_tabs/SwapUser";
import Links from "./_tabs/Links";
import { useRouter, useSearchParams } from "next/navigation";

export default function page() {
  const searchparams = useSearchParams();
  const defaultKey = searchparams?.get("tab");
  const router = useRouter();
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
        <Tabs
          color={"danger"}
          aria-label="Tabs colors"
          radius="full"
          defaultSelectedKey={defaultKey ?? "Table"}
          onSelectionChange={(e) => {
            router.push("?tab=" + e);
          }}
        >
          <Tab key="Table" title="Table">
            <Tables />
          </Tab>
          <Tab key="Attendee" title="Attendee">
            <Users />
          </Tab>
          <Tab key="Swap" title="Swap seats">
            <SwapUser />
          </Tab>
          <Tab key="Links" title="Links">
            <Links />
          </Tab>
        </Tabs>
      </main>
    </main>
  );
}
