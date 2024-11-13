"use client";
import { useEventStore } from "@/store/useEventStore";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { CurrentUser } from "./CurrentUser";

export default function Home() {
  const { tabels, users, fetchTables, fetchUsers, AddNewMember } =
    useEventStore();
  useEffect(() => {
    if (!tabels) {
      fetchTables();
    }
    if (!users) {
      fetchUsers();
    }
  }, []);
  const adjustTable = async () => {
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
    for (let i = 0; i < newTable.length; i++) {
      // await AddNewMember(data[i], true);
      try {
        await axios.patch(
          "https:api.gokapturehub.com/airtel/table/" + newTable[i].tableNumber,
          newTable[i]
        );
      } catch (error) {
        console.log(error);
      }
    }
    // call the update api for table;
  };

  const HandleAddNewUser = async () => {
    const data = CurrentUser.map((e) => {
      let data: any = {
        name: e.name.trim(),
        tableNumber: parseInt(e.tableNumber),
      };
      if (e.email) {
        data.email = e.email.trim();
      }
      return data;
    });
    for (let i = 0; i < data.length; i++) {
      // await AddNewMember(data[i], true);
      try {
        await axios.post("https:api.gokapturehub.com/airtel/user", data[i]);
      } catch (error) {
        console.log(error);
      }
    }
    console.log("add new member data", data);
  };
  return (
    <main>
      <p>ENV = {process.env.NODE_ENV}</p>
      {/* <Button onClick={adjustTable}>HandleAddNewUser</Button> */}
      <Link className="m-5" href={"/admin"}>
        <Button>Admin</Button>
      </Link>
    </main>
  );
}
