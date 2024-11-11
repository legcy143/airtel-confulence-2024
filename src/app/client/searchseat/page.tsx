"use client";
import { EventDetail } from "@/constants/EventDetail";
import { Button, Divider, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useFeature } from "@/store/useFetaure";
import { UserInterface } from "@/store/types/EventStore";

export default function page() {
  const filteredData = useFeature((s) => s.filteredData);
  const SearchUser = useFeature((s) => s.SearchUser);
  const resteFilterData = useFeature((s) => s.resteFilterData);

  useEffect(() => {
    resteFilterData();
    return () => {
      resteFilterData();
    };
  }, []);

  const [isDropVisible, setisDropVisible] = useState(false);
  const [value, setvalue] = useState("");
  const [selectedProfile, setselectedProfile] = useState<UserInterface | null>(
    null
  );

  const handleBlur = (time: number) => {
    setTimeout(() => {
      setisDropVisible(false);
    }, time);
  };

  return (
    <main className="h-full overflow-y-auto">
      <nav className="px-1 md:px-5 border-b-0 h-[5rem] flex items-center justify-between sticky top-0 backdrop-blur-xl z-30">
        <div className="h-[90%]">
          <img src={EventDetail.logo.lg} className="h-full" alt="" />
        </div>
        <div>
          <p className="font-semibold opacity-80 text-xl hidden md:block">
            Table Locater
          </p>
        </div>
      </nav>
      <Divider />
      <main className="p-2 max-w-[50rem] mx-auto space-y-3">
        <div className="relative w-full group">
          <Input
            className="w-full"
            type="search"
            startContent={<Icon icon="ic:round-search" />}
            label="Search Seat"
            description="Search your seat by email or name"
            placeholder="Name or Email ..."
            autoComplete="off"
            onFocus={() => setisDropVisible(true)}
            onBlur={() => handleBlur(500)}
            onChange={(e) => {
              if (!isDropVisible) {
                setisDropVisible(true);
              }
              SearchUser(e.target.value);
            }}
          />
          {/* Dropdown list */}
          {isDropVisible && (
            <div className="absolute top-[3.5rem] w-full rounded-md shadow-lg z-10 bg-default">
              {!filteredData?.length && (
                <p className="text-center p-2 capitalize">no result found</p>
              )}
              <ul className="max-h-60 overflow-y-auto">
                {filteredData?.map((user, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer"
                    onClick={(e) => {
                      setselectedProfile(user);
                    }}
                  >
                    <span>{user?.name}</span>
                    <span className="text-sm opacity-80">({user?.email})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {selectedProfile && (
          <>
            <Card data={selectedProfile} />
            <div className="h-fit p-0 mb-3 overflow-hidden w-fit mx-auto rounded-md">
              <img
                className="object-contain h-full w-fit mx-auto"
                src="/assets/hall-layout.jpg"
                alt="img"
              />
            </div>
          </>
        )}
      </main>
    </main>
  );
}

const Card = ({ data }: { data: UserInterface }) => {
  return (
    <div className="m-auto relative drop-shadow-xl size-[13rem] overflow-hidden rounded-xl bg-[#3d3c3d] cursor-pointer">
      <div className="absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#323132] flex-col">
        <span>Table Number</span>
        <h2 className="text-9xl font-bold my-auto">{data?.tableNumber}3</h2>
        <div className="text-xs w-full truncate flex flex-col p-2 text-center">
          <span>{data?.name}</span>
          <span className="opacity-70">{data?.email ?? "N/A"}</span>
        </div>
      </div>
      <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
    </div>
  );
};
