"use client";
import TableUI from "@/components/next-ui/table";
import { useEventStore } from "@/store/useEventStore";
import { TableDataWithSequence } from "@/utils/TableData";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { columnInterface } from "@/components/next-ui/table/Table";
import ViewMemberOnTable from "../_components/ViewMemberOnTable";
import { Chip, Skeleton } from "@nextui-org/react";
import Image from "next/image";
import { EventDetail } from "@/constants/EventDetail";

export const column: columnInterface[] = [
  { name: "Sr.no", uid: "seq", className: " w-[5rem] text-center" },
  {
    name: "table",
    uid: "tableNumber",
    className: "w-[10rem]",
    sortable: true,
  },
  {
    name: "Vacant seat",
    uid: "vacantSeat",
    className: "ml-auto w-[9rem] text-center ",
  },
  { name: "Member", uid: "member", className: "w-full  text-center" },
];

export default function Tables() {
  const tabels = useEventStore((s) => s.tabels);
  const isTableFetchLoading = useEventStore((s) => s.isTableFetchLoading);
  const maxUserOnSingleTable = useEventStore((s) => s.maxUserOnSingleTable);

  const renderCell = useCallback((event: any, columnKey: any) => {
    const cellValue = event[columnKey];
    switch (columnKey) {
      case "seq":
        return <span className="opacity-90 font-normal">{cellValue}</span>;
      case "vacantSeat":
        return (
          <span className="opacity-90 font-normal flex justify-center">
            {event?.users?.length != undefined ? (
              maxUserOnSingleTable - event?.users?.length > 0 ? (
                <Chip color="warning" variant="flat">
                  {maxUserOnSingleTable - event?.users?.length} vacant
                </Chip>
              ) : (
                <Chip color="success" variant="flat">
                  {event?.users?.length}/{maxUserOnSingleTable} Full
                </Chip>
              )
            ) : (
              "error"
            )}
          </span>
        );
      case "tableNumber":
        return (
          <span className="w-[25rem] opacity-90 font-normal">
            {cellValue?.toString() == "0"
              ? "Theater seat"
              : "Table#" + cellValue}
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
        searchBy="tableNumber"
        isLoading={isTableFetchLoading}
        loadingCell={[1, 2, 3, 4, 5]?.map((e) => (
          <div key={e} className="flex  gap-2 my-2">
            <Skeleton className="w-[5rem] h-[2rem]"></Skeleton>
            <Skeleton className="w-[8rem] h-[2rem]"></Skeleton>
            <Skeleton className="w-[10rem] h-[2rem]"></Skeleton>
            <Skeleton className="w-full h-[2rem]"></Skeleton>
          </div>
        ))}
        renderCell={renderCell}
        tableData={TableDataWithSequence(tabels ?? [])}
        columns={column}
      />
      <div className="flex-1 p-5">
        <div className=" h-fit max-h-[100%] p-0 overflow-hidden w-fit mx-auto rounded-md">
          <img
            className="object-contain h-full mx-auto"
            // src="/assets/hall-layout.jpg"
            src={EventDetail.layout}
            alt="img"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
