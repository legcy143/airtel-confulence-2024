"use client";
import TableUI from "@/components/next-ui/table";
import { useEventStore } from "@/store/useEventStore";
import { TableDataWithSequence } from "@/utils/TableData";
import React, { useCallback } from "react";
import { columnInterface } from "@/components/next-ui/table/Table";
import ViewMemberOnTable from "../_components/ViewMemberOnTable";
import { Chip } from "@nextui-org/react";

export const column: columnInterface[] = [
  { name: "Sr.no", uid: "seq", className: " w-[5rem] text-center" },
  { name: "Table", uid: "tablenumber" },
  {
    name: "Vacant seat",
    uid: "vacantSeat",
    className: "ml-auto w-[9rem] text-center ",
  },
  { name: "Member", uid: "member", className: "w-full  text-center" },
];

export default function Tables() {
  const tabels = useEventStore((s) => s.tabels);
  const maxUserOnSingleTable = useEventStore((s) => s.maxUserOnSingleTable);

  const renderCell = useCallback((event: any, columnKey: any) => {
    const cellValue = event[columnKey];
    switch (columnKey) {
      case "seq":
        return <span className="opacity-90 font-normal">{cellValue}</span>;
      case "vacantSeat":
        return (
          <span className="opacity-90 font-normal flex justify-center">
            {event?.users?.length &&
            maxUserOnSingleTable - event?.users?.length > 0 ? (
              <Chip color="warning" variant="flat">
                {maxUserOnSingleTable - event?.users?.length} vacant
              </Chip>
            ) : (
              <Chip color="success" variant="flat">
                {event?.users?.length}/{maxUserOnSingleTable} Full
              </Chip>
            )}
          </span>
        );
      case "tablenumber":
        return (
          <span className="w-[20rem] opacity-90 font-normal">
            {"Table#" + cellValue}
          </span>
        );
      case "member":
        return (
          <div className="flex  justify-center">
            {" "}
            <ViewMemberOnTable users={event.users} />
          </div>
        );
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
      <div className="flex-1 p-5">
        <div className=" h-fit max-h-[100%] p-0 overflow-hidden w-fit mx-auto rounded-md">
          <img
            className="object-contain h-full mx-auto"
            src="/assets/hall-layout.jpg"
            alt="img"
          />
        </div>
      </div>
    </section>
  );
}
