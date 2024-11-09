import TableUI from "@/components/next-ui/table";
import { columnInterface } from "@/components/next-ui/table/Table";
import { useEventStore } from "@/store/useEventStore";
import { TableDataWithSequence } from "@/utils/TableData";
import React, { useCallback, useEffect } from "react";

const column: columnInterface[] = [
  { name: "Sr.no", uid: "seq", className: " w-[5rem]" },
  { name: "table.no", uid: "tableNumber", className: " w-[7rem]" },
  { name: "seat.no", uid: "seatNumber" ,className: " w-[7rem]"},
  { name: "name", uid: "name" },
  { name: "email", uid: "email" },
  { name: "phone number", uid: "phoneNumber" },
];

export default function Users() {
  const fetchUsers = useEventStore((state) => state.fetchUsers);
  const users = useEventStore((s) => s.users);
  useEffect(() => {
    if (!users) {
      fetchUsers();
    }
    console.log(users);
  }, [users]);

  const renderCell = useCallback((event: any, columnKey: any) => {
    const cellValue = event[columnKey];
    switch (columnKey) {
      case "seatnumber":
        return <div>{cellValue}</div>;
      case "phoneNumber":
        return <div>{cellValue ?? "N/A"}</div>;
      default:
        return <div className="w-fit opacity-90 font-normal">{cellValue}</div>;
    }
  }, []);

  return (
    <TableUI
      className="flex-1"
      selectionMode="none"
      statusOptions={[]}
      title="Tables"
      renderCell={renderCell}
      tableData={TableDataWithSequence(users ?? [])}
      columns={column}
    />
  );
}
