"use client";
import { TableInterface, UserInterface } from "@/store/types/EventStore";
import { useEventStore } from "@/store/useEventStore";
import { isValidEmail } from "@/utils/TestRegex";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";

type vacantSeatTable = {
  avilable: number;
  _id: string | number;
} & Pick<TableInterface, "tableNumber" | "_id">;

export default function AddNewUserModel() {
  const { onOpen, onOpenChange, onClose, isOpen } = useDisclosure();
  const [data, setdata] = useState<UserInterface>({
    _id: Math.random().toString(),
    email: "",
    name: "",
    phoneNumber: "",
    tableNumber: 0,
  });
  const [vacantTable, setacantTable] = useState<vacantSeatTable[]>([]);

  //table from store
  const tabels = useEventStore((s) => s.tabels);
  const fetchTables = useEventStore((s) => s.fetchTables);
  const maxUserOnSingleTable = useEventStore((s) => s.maxUserOnSingleTable);
  const AddNewMember = useEventStore((s) => s.AddNewMember);
  const isUserCreatingLoading = useEventStore((s) => s.isUserCreatingLoading);

  const handleChange = (key: keyof UserInterface, value: string | number) => {
    setdata((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const resetData = () => {
    setdata({
      _id: Math.random().toString(),
      email: "",
      name: "",
      phoneNumber: "",
      tableNumber: 0,
    });
    setacantTable([]);
  };
  const handleOpenchange = async () => {
    onOpen();
    let vacantData: vacantSeatTable[] = (tabels ?? [])
      .map((e) => {
        let avilable = maxUserOnSingleTable - e.users.length;
        if (avilable > 0) {
          let data = {
            _id: e._id,
            avilable,
            tableNumber: e.tableNumber,
          };
          return data;
        }
        return null;
      })
      ?.filter((e) => e != null);
    setacantTable(vacantData);
  };

  let closeBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button onPress={handleOpenchange} isLoading={!tabels} color="danger">
        Add Members
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={resetData}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span>Add New Member</span>
                <Breadcrumbs
                  itemClasses={{
                    item: [
                      "data-[current=true]:text-danger",
                      "data-[disabled=true]:text-default-500",
                    ],
                  }}
                  className="font-normal opacity-90 capitalize"
                >
                  <BreadcrumbItem isCurrent={!data.tableNumber}>
                    table number
                  </BreadcrumbItem>
                  <BreadcrumbItem isCurrent={!!data.tableNumber}>
                    member detail
                  </BreadcrumbItem>
                </Breadcrumbs>
              </ModalHeader>
              <ModalBody>
                <Select
                  label="Table"
                  placeholder="Select Table Number"
                  description="select table from avilable table"
                  onChange={(e) => {
                    handleChange("tableNumber", e.target.value);
                  }}
                >
                  {vacantTable.map((e) => (
                    <SelectItem key={e.tableNumber}>
                      {e.tableNumber?.toString()}
                    </SelectItem>
                  ))}
                </Select>
                {data.tableNumber ? (
                  <>
                    <Input
                      label="Name"
                      isRequired={true}
                      placeholder="Enter Member Name"
                      value={data.name}
                      onChange={(e) => {
                        handleChange("name", e.target.value);
                      }}
                    />
                    <Input
                      label="Email"
                      placeholder="Enter Member Email"
                      value={data.email}
                      isInvalid={!!data.email && !isValidEmail(data.email)}
                      onChange={(e) => {
                        handleChange("email", e.target.value);
                      }}
                    />
                  </>
                ) : (
                  ""
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  ref={closeBtnRef}
                  variant="flat"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  color="danger"
                  isDisabled={(!data.tableNumber || isUserCreatingLoading)}
                  onClick={async () => {
                    let res = await AddNewMember(data);
                    if (res) {
                      closeBtnRef.current?.click();
                    }
                  }}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
