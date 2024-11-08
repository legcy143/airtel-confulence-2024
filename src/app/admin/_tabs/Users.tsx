import TableUI from "@/components/next-ui/table";
import { columnInterface } from "@/components/next-ui/table/Table";
import { useEventStore } from "@/store/useEventStore";
import { TableDataWithSequence } from "@/utils/TableData";
import React, { useCallback, useEffect } from "react";

const column: columnInterface[] = [
  { name: "Sr.no", uid: "seq", className: " w-[5rem] text-center" },
  { name: "Table", uid: "tablenumber" },
  { name: "Member", uid: "member" },
];

export default function Users() {
  const fetchUsers = useEventStore((state) => state.fetchUsers);
  const users = useEventStore((s) => s.users);
  useEffect(() => {
    if (!users) {
      fetchUsers();
    }
    console.log(users)
  }, [users]);

  const renderCell = useCallback((event: any, columnKey: any) => {
    const cellValue = event[columnKey];
    switch (columnKey) {
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
        tableData={TableDataWithSequence(users??[])}
        columns={column}
      />
      <div className="flex-1">Table Map goes here</div>
    </section>
  );
}
