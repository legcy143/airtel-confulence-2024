"use client";
import { EditIcon } from "@/components/Icons";
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
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";

type vacantSeatTable = {
  avilable: number;
  _id: string | number;
} & Pick<TableInterface, "tableNumber" | "_id">;

export default function UpdateUserModel({
  prevData,
}: {
  prevData: UserInterface;
}) {
  const { onOpen, onOpenChange, onClose, isOpen } = useDisclosure();
  const [data, setdata] = useState<UserInterface>({
    _id: Math.random().toString(),
    email: "",
    name: "",
    phoneNumber: "",
    tableNumber: 0,
  });

  //table from store
  const updateUser = useEventStore((s) => s.updateUser);
  const isUserUpdateLoading = useEventStore((s) => s.isUserUpdateLoading);

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
  };
  const handleOpenchange = async () => {
    onOpen();
    setdata({
      _id: prevData._id,
      email: prevData.email,
      name: prevData.name,
      phoneNumber: prevData.phoneNumber,
      tableNumber: prevData.tableNumber,
    });
  };

  let closeBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Tooltip content="Edit">
        <Button
          isIconOnly
          variant="flat"
          color="primary"
          onPress={handleOpenchange}
        >
          <EditIcon />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={resetData}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span>Update {prevData.name} Data</span>
              </ModalHeader>
              <ModalBody>
                <Input
                  isDisabled
                  label="Table Number"
                  isRequired={true}
                  placeholder="Enter Member Name"
                  value={prevData.tableNumber?.toString()}
                />
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
                  isLoading={isUserUpdateLoading}
                  color="danger"
                  onClick={async () => {
                    let res = await updateUser(prevData._id, data);
                    if (res) {
                      closeBtnRef.current?.click();
                    }
                  }}
                >
                  update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
