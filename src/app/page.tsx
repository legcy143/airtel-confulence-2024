"use client";
import { useEventStore } from "@/store/useEventStore";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const { tabels, users, fetchTables, fetchUsers } = useEventStore();
  useEffect(() => {
    if (!tabels) {
      fetchTables();
    }
    if (!users) {
      fetchUsers();
    }
  }, []);
  const adjustTable = () => {
    if (!tabels || !users) return;
    let newTable = [...tabels];

    for (let i = 0; i < users.length; i++) {
      let idx = newTable.findIndex(
        (e) => e.tableNumber == users[i].tableNumber
      );
      console.log(idx);
      if (idx != undefined) {
        // @ts-ignore
        newTable[idx].users.push(users[i]._id);
      }
    }
    console.log(newTable);
    // call the update api for table;
  };
  return (
    <main>
      <p>ENV = {process.env.NODE_ENV}</p>
      <Button isDisabled={true} onClick={adjustTable}>
        adjust table
      </Button>
      <Link className="m-5" href={"/admin"}>
        <Button>Admin</Button>
      </Link>
    </main>
  );
}
