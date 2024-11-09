"use client";
import { useFeature } from "@/store/useFetaure";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/react";
import React, { useEffect } from "react";
import ChooseUserModel from "../_components/ChooseUserModel";
import { useEventStore } from "@/store/useEventStore";

export default function SwapUser() {
  const filteredData = useFeature((s) => s.filteredData);
  const SearchUser = useFeature((s) => s.SearchUser);
  const swapUserData = useFeature((s) => s.swapUserData);
  const swapMemberSheet = useEventStore((s) => s.swapMemberSheet);
  useEffect(() => {
    SearchUser("ab");
  }, []);

  return (
    <section className="h-full p-2  flex items-center justify-center gap-2 md:gap-5">
      <ChooseUserModel userData={swapUserData.user1} isFor={1} />
      <Button color="danger" isIconOnly onClick={swapMemberSheet}>
        <Icon icon="charm:swap-horizontal" />
      </Button>
      <ChooseUserModel userData={swapUserData.user2} isFor={2} />
    </section>
  );
}
