"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  getKeyValue,
  Skeleton,
  cn,
  Select,
  SelectItem,
  TableVariantProps,
} from "@nextui-org/react";
import {
  ChevronDownIcon,
  PlusIcon,
  SearchIcon,
  VerticalDotsIcon,
} from "../../Icons";
import { Icon } from "@iconify/react";
import { Capitalize } from "@/utils/TextTransform";

export interface columnInterface {
  uid: string;
  name: string;
  sortable?: boolean;
  className?: string;
}

interface statusOptionsInterface {
  uid: string;
  name: string;
}

interface tableDataInterface extends Record<any, any> {
  _id: string | number;
}

interface TableProps {
  isLoading?: boolean;
  title: string;
  columns: columnInterface[];
  tableData: tableDataInterface[];
  statusOptions: statusOptionsInterface[];
  INITIAL_VISIBLE_COLUMNS?: string[];
  TotalNumberOfData?: number;
  renderCell?: (
    item: tableDataInterface,
    columnKey: string | number
  ) => React.ReactNode;
  onPageChange?: (pagenumber: number) => void;
  currentPage?: number;
  action?: React.ReactNode;
  icon?: string;
  headerTitle?: string;
  headerAccumulate?: boolean;
  className?: string;
  selectionMode?: "multiple" | "none" | "single";
  disabledKeys?: string[];
  numberOfDataPerPage?: number;
  classNames?: any;
  setNumberOfDataPerPage?: (num: number) => void;
  varients?: TableVariantProps;
  loadingCell?: React.ReactNode;
}

export default function TableUI({
  loadingCell,
  isLoading = false,
  TotalNumberOfData,
  action,
  title,
  columns,
  tableData,
  statusOptions,
  renderCell,
  INITIAL_VISIBLE_COLUMNS,
  icon,
  headerTitle,
  headerAccumulate = false,
  className,
  selectionMode = "multiple",
  disabledKeys = [],
  onPageChange,
  currentPage = 1,
  numberOfDataPerPage = 10,
  setNumberOfDataPerPage,
  classNames,
  varients = {
    color: "danger",
  },
}: TableProps) {
  const GetInitialVisibleColumns = React.useMemo(() => {
    let arr: string[] = [];
    columns.forEach((column) => {
      arr.push(column.uid);
    });
    return arr;
  }, [columns]);
  const INITIAL_VISIBLE_COLUMNS_LOCAL =
    INITIAL_VISIBLE_COLUMNS || GetInitialVisibleColumns;

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS_LOCAL)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(numberOfDataPerPage);
  const [sortDescriptor, setSortDescriptor] = React.useState<{
    column: string;
    direction: "ascending" | "descending";
  }>({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(currentPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns.size === columns.length || headerAccumulate) {
      return columns;
    }
    // console.log("columns", columns)
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns, columns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...tableData];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((data) =>
        data?.name?.toLowerCase()?.includes(filterValue?.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((data) =>
        Array.from(statusFilter).includes(data?.status as string)
      );
    }

    return filteredUsers;
  }, [tableData, filterValue, statusFilter]);

  const pages = TotalNumberOfData
    ? Math.ceil(TotalNumberOfData / rowsPerPage)
    : Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const column = sortDescriptor.column as keyof typeof a;
      const first = a[column];
      const second = b[column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
      if (onPageChange) onPageChange(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
      if (onPageChange) onPageChange(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      if (setNumberOfDataPerPage)
        setNumberOfDataPerPage(Number(e.target.value));
      setPage(1);
      if (onPageChange) onPageChange(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
      if (onPageChange) onPageChange(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
    if (onPageChange) onPageChange(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        {headerTitle && (
          <header className={cn("flex items-center gap-3 p-2")}>
            {icon && <Icon icon={icon} className="text-2xl" />}
            <h1 className="text-xl font-semibold">{title}</h1>
          </header>
        )}
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            {statusOptions?.length > 0 && (
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    variant="flat"
                  >
                    Status
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode="multiple"
                  onSelectionChange={(keys) =>
                    setStatusFilter(Array.from(keys).join(","))
                  }
                >
                  {statusOptions.map((status) => (
                    <DropdownItem key={status.uid} className="capitalize">
                      {Capitalize(status.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={(keys) =>
                  setVisibleColumns(new Set(Array.from(keys) as string[]))
                }
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {Capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {action}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {TotalNumberOfData ?? tableData.length + " "} {title}
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            {/* <span className='w-full pl-[-5rem] bg-red-500'>Rows per page:</span> */}
            {/* <Select
            className='w-[7rem]'
              value={rowsPerPage}
              onChange={onRowsPerPageChange}
              defaultSelectedKeys={[rowsPerPage]}>
              {['0', '5', '10'].map(size => (
                <SelectItem key={size}>{size.split('x').map(Number).join(' x ')}</SelectItem>
              ))}
            </Select> */}
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              value={rowsPerPage}
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    // onRowsPerPageChange,
    rowsPerPage,
    tableData.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        {selectionMode == "multiple" && (
          <span className="w-[30%] text-small text-default-400">
            {selectedKeys.size === items.length
              ? "All items selected"
              : `${selectedKeys.size} of ${filteredItems.length} selected`}
          </span>
        )}
        <Pagination
          classNames={{
            cursor:
              "bg-gradient-to-b shadow-lg from-danger-300 to-danger-700 dark:from-danger-300 dark:to-danger-100 text-white font-bold",
          }}
          isCompact
          showControls
          color="danger"
          page={page}
          total={pages}
          onChange={(e) => {
            setPage(e);
            if (onPageChange) onPageChange(e);
          }}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      className={cn("h-full", className)}
      aria-labelledby="Tableui"
      classNames={classNames}
      selectedKeys={selectedKeys}
      disabledKeys={disabledKeys}
      selectionMode={selectionMode}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      color={varients.color}
      onSelectionChange={(keys: any) => setSelectedKeys(keys as any)}
      onSortChange={(descriptor: any) =>
        setSortDescriptor(
          descriptor as {
            column: string;
            direction: "ascending" | "descending";
          }
        )
      }
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={"start"}
            className={column.className}
            allowsSorting={column.sortable}
          >
            {Capitalize(column.name)}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={
          <>
            {isLoading ? (
              <>
                {loadingCell ? (
                  <>{loadingCell}</>
                ) : (
                  <div>
                    {[1, 2, 3, 4, 5]?.map((e) => {
                      return (
                        <div key={e} className="flex gap-2">
                          <Skeleton className="p-2 my-2 flex-1 rounded-lg max-w-14">
                            Loading
                          </Skeleton>
                          {INITIAL_VISIBLE_COLUMNS?.map((e, i) => {
                            return (
                              <Skeleton
                                key={e}
                                className="p-2 my-2 flex-1 rounded-lg"
                              >
                                Loading
                              </Skeleton>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <>No {title} found</>
            )}
          </>
        }
        items={sortedItems}
      >
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell key={`${item._id}-${columnKey}`}>
                {renderCell
                  ? renderCell(item, columnKey)
                  : getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
