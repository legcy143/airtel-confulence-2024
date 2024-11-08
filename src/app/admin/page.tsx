"use client";
import { EventDetail } from "@/constants/EventDetail";
import { Button, Divider, Tab, Tabs } from "@nextui-org/react";
import React from "react";
import { Icon } from "@iconify/react";
import Users from "./_tabs/Users";
import Tables from "./_tabs/Tables";

export default function page() {
  return (
    <main>
      <nav className="px-5 border-b-0 h-[5rem] flex items-center justify-between sticky top-0 backdrop-blur-xl z-30">
        <div className="h-[90%]">
          <img src={EventDetail.logo.lg} className="h-full" alt="" />
        </div>
        <Button
          isIconOnly
          color="danger"
          variant="flat"
          className="p-0"
          size="lg"
        >
          <Icon icon="majesticons:menu" width={30} />
        </Button>
      </nav>
      <Divider />
      <main className="p-2">
        <Tabs color={"danger"} aria-label="Tabs colors" radius="full">
          <Tab key="Table" title="Table">
            <Tables />
          </Tab>
          <Tab key="Attendee" title="Attendee">
            <Users />
          </Tab>
        </Tabs>
      </main>
    </main>
  );
}
