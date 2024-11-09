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

const rows = [
  {
    key: "1",
    label: "Table Locater",
    seq: 1,
    link: "/client/searchseat",
  },
];

const columns = [
  {
    key: "seq",
    label: "Seq",
  },
  {
    key: "label",
    label: "Label",
  },
  {
    key: "link",
    label: "Link",
  },
];

export default function Links() {
  return (
    <Table
      aria-label="Example table with dynamic content"
      className="max-w-[30rem]"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>
                {columnKey === "link" ? (
                  <Link href={getKeyValue(item, columnKey)} passHref>
                    <Button
                      variant="flat"
                      color="danger"
                      endContent={<Icon icon="material-symbols:arrow-insert" className="rotate-[90deg]"/>}
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
