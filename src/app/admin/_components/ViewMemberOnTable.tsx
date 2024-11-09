"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { UserInterface } from "@/store/types/EventStore";

export default function ViewMemberOnTable({
  users,
}: {
  users: UserInterface[];
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        onPress={onOpen}
        color="danger"
        variant="flat"
        startContent={<Icon icon="fa6-solid:users-line" />}
      >
        View Members
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={"inside"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Table Details
              </ModalHeader>
              <ModalBody>
                {users?.map((e, i) => {
                  return <div key={i}>{e.name}</div>;
                })}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
