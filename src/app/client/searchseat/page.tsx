"use client";
import { EventDetail } from "@/constants/EventDetail";
import { Button, Divider, Input, Tab, Tabs } from "@nextui-org/react";
import React from "react";
import { Icon } from "@iconify/react";
import ShowDataTable from "./ShowDataTable";

export default function page() {
  const data = [
    {
      _id:1,
      seq: 1,
      name: "John",
      seatNumber:4,
      tableNumber:2,
    },
  ];

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
      <main className="p-2 max-w-[50rem] mx-auto space-y-3">
        <Input
          type="search"
          startContent={<Icon icon="ic:round-search" />}
          label="Search Seat"
          description="Search your seat by email or name "
          placeholder="Name or Email ..."
        />
        <ShowDataTable data={data} />
      </main>
    </main>
  );
}
