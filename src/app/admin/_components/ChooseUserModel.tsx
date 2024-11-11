"use client";
import React, { useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { UserInterface } from "@/store/types/EventStore";
import TableUI from "@/components/next-ui/table";
import { useFeature } from "@/store/useFetaure";

export default function ChooseUserModel({
  userData,
  isFor = 1,
}: {
  userData?: UserInterface | null;
  isFor: number;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const filteredData = useFeature((s) => s.filteredData);
  const SearchUser = useFeature((s) => s.SearchUser);
  const SetSwapperData = useFeature((s) => s.SetSwapperData);
  const resteFilterData = useFeature((s) => s.resteFilterData);
  const closebtnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <UserCard onClick={onOpen} data={userData} />
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={resteFilterData}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Table Details
                <small className="text-xs leading-3 font-normal opacity-75">
                  Click to selet Data
                </small>
              </ModalHeader>
              <ModalBody>
                <Input
                  startContent={<Icon icon="ic:round-search" />}
                  type="search"
                  autoFocus
                  onChange={(e) => {
                    SearchUser(e.target.value);
                  }}
                />
                {!filteredData?.length ? (
                  <p>No Result found , type something to get data</p>
                ) : (
                  <>
                    {filteredData?.map((e, i) => {
                      return (
                        <div
                          className="hover:bg-gray-700/50 p-2 rounded"
                          onClick={() => {
                            SetSwapperData(e, isFor);
                            closebtnRef?.current?.click();
                          }}
                          key={i}
                        >
                          {e.name}
                        </div>
                      );
                    })}
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  ref={closebtnRef}
                  variant="flat"
                  onPress={onClose}
                >
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

export const UserCard = ({
  onClick,
  data,
}: {
  onClick: () => void;
  data?: UserInterface | null;
}) => {
  return (
    <div
      onClick={onClick}
      className="relative drop-shadow-xl size-[8rem] overflow-hidden rounded-xl bg-[#3d3c3d] cursor-pointer"
    >
      <div className="absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#323132] flex-col">
        {!data ? (
          <>
            <Icon icon="uil:user" className="text-8xl opacity-60" />
            <small className="text-sm opacity-70">select user</small>
          </>
        ) : (
          <div>
            {/* _id {data?._id?.slice(20,data._id.length)} <br /> */}
            name {data?.name} <br />
            table {data?.tableNumber} <br />
          </div>
        )}
      </div>
      <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
    </div>
  );
};
