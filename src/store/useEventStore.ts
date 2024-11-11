import { create } from "zustand";
import {
  EventStoreInerface,
  TableInterface,
  UserInterface,
} from "./types/EventStore";
import { toast } from "sonner";
import { useFeature } from "./useFetaure";
import { data } from "framer-motion/client";
import { swapUsers } from "./helper/SwapUser";
import axios from "axios";

let API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useEventStore = create<EventStoreInerface>((set, get) => ({
  isFetchLoading: false,
  maxUserOnSingleTable: 6,
  users: null,
  tabels: null,

  fetchUsers: async () => {
    let users: UserInterface[] = [];
    get().tabels?.map((e) => {
      if (Array.isArray(e.users)) {
        let usersWithtable = e.users.map((x) => ({
          tableNumber: e.tableNumber,
          ...x,
        }));
        users?.push(...usersWithtable);
      }
    }) ?? [];
    set({ users });
  },
  fetchTables: async () => {
    try {
      let res = await axios.get(API_URL + "/airtel/table");
      set({ tabels: res.data.data });
    } catch (error) {}
  },

  AddNewMember: async (data) => {
    // let tabels = get()?.tabels ?? [];
    // if (!data.tableNumber) return;
    // data.tableNumber = +data.tableNumber;
    // let tableNumberindex = tabels?.findIndex(
    //   (e) => e.tableNumber == data.tableNumber
    // );

    // if (tabels[tableNumberindex]) {
    //   tabels[tableNumberindex].users.push(data);
    //   get().fetchUsers();
    // }
    try {
      const { _id, ...reqbody } = data;
      let createUserRes = await axios.post(API_URL + "/airtel/user", reqbody);
      let newuser: UserInterface = createUserRes.data.data;

      getTableByTableByNumber(newuser.tableNumber);
      let updateTable = await axios.post(
        API_URL + "/airtel/table" + newuser.tableNumber
      );
    } catch (error) {}
  },

  swapMemberSheet: () => {
    const data: {
      user1: UserInterface | null;
      user2: UserInterface | null;
    } = useFeature.getState().swapUserData;

    if (!data.user1) {
      return toast.error("Please select user 1 to swap");
    }
    if (!data.user2) {
      return toast.error("Please select user 2 to swap");
    }

    let prev = [...(get().tabels ?? [])];
    let updatedValue = swapUsers(prev, data.user1, data.user2);
    set({ tabels: updatedValue });
    useFeature.getState().resetSwapperData();
    get().fetchUsers();
  },
}));
