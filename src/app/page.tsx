"use client";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

import * as XLSX from "xlsx";
interface JsonData {
  [key: string]: string | number; // Define a general object with string keys and value as string or number
}

export default function Home() {
  const [tableNumber, settableNumber] = useState(2);
  const [t2Data, sett2Data] = useState([
    {
      name: "PETE SMITH",
      email: "Pete.Smith@aviatnet.com",
      tableNumber,
    },
  ]);
  const createUser = async () => {
    try {
      // let res = await axios.post(""
      console.log(t2Data);
    } catch (error) {
      console.log("error : ", error);
    }
    toast.success("done all");
  };

  // Input fields for name and email
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Add new entry
  const handleAdd = () => {
    if (name) {
      sett2Data([...t2Data, { name, email, tableNumber }]);
      setName("");
      setEmail("");
    } else {
      alert("Please provide both name and email.");
    }
  };

  // Update existing entry
  const handleUpdate = (index: number) => {
    const updatedData = [...t2Data];
    updatedData[index] = { name, email, tableNumber };
    sett2Data(updatedData);
    setName("");
    setEmail("");
  };

  // Delete entry
  const handleDelete = (index: number) => {
    const updatedData = t2Data.filter((_, i) => i !== index);
    sett2Data(updatedData);
  };
  return (
    <main>
      <Button className="m-24" onClick={createUser}>
        create table
      </Button>

      {/* <Link href={"/admin"}>
        <Button>Admin</Button>
      </Link> */}

      <div style={{ padding: "20px" }}>
        <h1>Manage Table Entries</h1>

        {/* Input Fields */}
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button onClick={handleAdd} style={{ marginBottom: "20px" }}>
          Add Entry
        </button>

        {/* Display Table Entries */}
        <div>
          {t2Data.map((entry, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <div>
                <strong>Name:</strong> {entry.name} <br />
                <strong>Email:</strong> {entry.email} <br />
                <strong>Table Number:</strong> {entry.tableNumber}
              </div>
              <button
                onClick={() => {
                  setName(entry.name);
                  setEmail(entry.email);
                }}
              >
                Edit
              </button>
           
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
