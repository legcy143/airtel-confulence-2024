"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
} from "@nextui-org/react";
import Link from "next/link";

const columns = [
  {
    key: "tableNumber",
    label: "Table Number",
  },
  {
    key: "seatNumber",
    label: "Seat Number",
  },
  {
    key: "name",
    label: "Name",
  },
];

export default function ShowDataTable({ data }: { data: any[] }) {
  return (
    <Table
      aria-label="Example table with dynamic content"
      className="w-full mx-auto"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>
                {columnKey === "link" ? (
                  <Link href={getKeyValue(item, columnKey)} passHref>
                    <Button
                      variant="flat"
                      color="danger"
                      endContent={
                        <Icon
                          icon="material-symbols:arrow-insert"
                          className="rotate-[90deg]"
                        />
                      }
                    >
                      Link
                    </Button>
                  </Link>
                ) : (
                  getKeyValue(item, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
