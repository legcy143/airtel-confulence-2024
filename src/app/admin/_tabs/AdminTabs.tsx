"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { Tab, Tabs } from "@nextui-org/react";
import Tables from "./Tables";
import Users from "./Users";
import SwapUser from "./SwapUser";
import Links from "./Links";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminTabs() {
  const defaultKey = useSearchParams()?.get("tab");
  const router = useRouter();
  return (
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
  );
}
