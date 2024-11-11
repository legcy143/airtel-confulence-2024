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

// {
//   "tableNumber": 4,
//   "users": [
//     "673207d0e71fda86be993cce",
// "673207d5e71fda86be993d78",
// "673207d8e71fda86be993df4",
// "673207d9e71fda86be993e08",
// "673207dbe71fda86be993e5c"
//   ]
// }

// {
//   "tableNumber": 3,
//   "users": [
//     "673207d0e71fda86be993cd2",
//     "673207dae71fda86be993e32",
// "673207e0e71fda86be993f1a",
// "673207e1e71fda86be993f26",
// "673207e1e71fda86be993f34
//   ]
// }
