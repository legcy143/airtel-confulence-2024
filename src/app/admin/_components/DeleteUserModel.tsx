"use client";
import { DeleteIcon } from "@/components/Icons";
import { useEventStore } from "@/store/useEventStore";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";

export default function DeleteUserModel({
  _id,
  name,
}: {
  _id: string;
  name: string;
}) {
  const { onOpen, onOpenChange, onClose, isOpen } = useDisclosure();
  //table from store
  const tabels = useEventStore((s) => s.tabels);
  const deleteUser = useEventStore((s) => s.deleteUser);
  const isUserDeleteLoading = useEventStore((s) => s.isUserDeleteLoading);

  let closeBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Tooltip content="delete user" className="bg-danger">
        <Button isIconOnly variant="flat" color="danger" onPress={onOpen}>
          <DeleteIcon />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span>Delete Member</span>
              </ModalHeader>
              <ModalBody>
                Are You sure want to delte{" "}
                <b className="font-bold capitalize">{name}</b>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  ref={closeBtnRef}
                  variant="flat"
                  onPress={onClose}
                >
                  No ,keep
                </Button>
                <Button
                  color="danger"
                  isLoading={isUserDeleteLoading}
                  onClick={async () => {
                    let res = await deleteUser(_id);
                    if (res) {
                      closeBtnRef.current?.click();
                    }
                  }}
                >
                  Yes , Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
