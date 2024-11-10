import { DeleteIcon, EditIcon } from "@/components/Icons";
import TableUI from "@/components/next-ui/table";
import { columnInterface } from "@/components/next-ui/table/Table";
import { useEventStore } from "@/store/useEventStore";
import { TableDataWithSequence } from "@/utils/TableData";
import React, { useCallback, useEffect } from "react";
import { Tooltip } from "@nextui-org/tooltip";
import AddNewUserModel from "../_components/AddNewUserModel";

const column: columnInterface[] = [
  { name: "Sr.no", uid: "seq", className: " w-[5rem]" },
  { name: "table.no", uid: "tableNumber", className: " w-[7rem]" },
  { name: "name", uid: "name" },
  { name: "email", uid: "email" },
  { name: "phone number", uid: "phoneNumber" },
  { name: "action", uid: "action" },
];

export default function Users() {
  const fetchUsers = useEventStore((state) => state.fetchUsers);
  const users = useEventStore((s) => s.users);
  useEffect(() => {
    if (!users) {
      fetchUsers();
    }
  }, []);

  const renderCell = useCallback((event: any, columnKey: any) => {
    const cellValue = event[columnKey];
    switch (columnKey) {
     
      case "phoneNumber":
        return <div>{cellValue ?? "N/A"}</div>;
      case "action":
        return (
          <div className="py-2 flex items-center gap-4">
            <Tooltip content="I am a tooltip" className="bg-danger">
              <DeleteIcon />
            </Tooltip>
            <EditIcon />
          </div>
        );
      default:
        return <div className="w-fit opacity-90 font-normal">{cellValue}</div>;
    }
  }, []);

  return (
    <TableUI
      className="flex-1"
      selectionMode="none"
      statusOptions={[]}
      title="Users"
      renderCell={renderCell}
      tableData={TableDataWithSequence(users ?? [])}
      columns={column}
      action={<AddNewUserModel />}
    />
  );
}
