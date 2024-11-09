"use client";
import TableUI from "@/components/next-ui/table";
import { useEventStore } from "@/store/useEventStore";
import { TableDataWithSequence } from "@/utils/TableData";
import React, { useCallback } from "react";
import { columnInterface } from "@/components/next-ui/table/Table";
import ViewMemberOnTable from "../_components/ViewMemberOnTable";

export const column: columnInterface[] = [
  { name: "Sr.no", uid: "seq", className: " w-[5rem] text-center" },
  { name: "Table", uid: "tablenumber" },
  { name: "Member", uid: "member" },
];

export default function Tables() {
  const tabels = useEventStore((s) => s.tabels);

  const renderCell = useCallback((event: any, columnKey: any) => {
    const cellValue = event[columnKey];
    switch (columnKey) {
      case "seq":
        return <span className="opacity-90 font-normal">{cellValue}</span>;
      case "tablenumber":
        return (
          <span className="w-[20rem] opacity-90 font-normal">
            {"Table#" + cellValue}
          </span>
        );
      case "member":
        return <ViewMemberOnTable users={event.users} />;
      default:
        return <div className="w-fit opacity-90 font-normal">{cellValue}</div>;
    }
  }, []);

  return (
    <section className="flex flex-col md:flex-row">
      <TableUI
        className="flex-1"
        selectionMode="none"
        statusOptions={[]}
        title="Tables"
        renderCell={renderCell}
        tableData={TableDataWithSequence(tabels ?? [])}
        columns={column}
      />
      <div className="flex-1">Table Map goes here</div>
    </section>
  );
}
