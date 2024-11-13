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
  const [jsonData, setJsonData] = useState<JsonData[] | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryString = e.target?.result as string; // Ensure the result is a string
        const wb = XLSX.read(binaryString, { type: "binary" });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const json: JsonData[] = XLSX.utils.sheet_to_json(sheet);
        console.log(json);
        setJsonData(json);
      };
      reader.readAsBinaryString(file);
    }
  };

  const createUser = async () => {
    try {
      // let res = await axios.post("")
    } catch (error) {
      console.log("error : ", error);
    }
    toast.success("done all");
  };
  return (
    <main>
      <Button className="m-5" onClick={createUser}>
        create table
      </Button>

      <div>
        <h1>Excel to JSON Converter</h1>
        <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} />

        {jsonData && (
          <div>
            <h2>Converted JSON Data</h2>
            <pre>{JSON.stringify(jsonData, null, 2)}</pre>
          </div>
        )}
      </div>

      <Link href={"/admin"}>
        <Button>Admin</Button>
      </Link>
    </main>
  );
}
