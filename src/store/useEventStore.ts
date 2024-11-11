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

// let API_URL = process.env.NEXT_PUBLIC_API_URL;
let API_URL = "https://api-new.gokapturehub.com";

export const useEventStore = create<EventStoreInerface>((set, get) => ({
  isFetchLoading: false,
  maxUserOnSingleTable: 6,
  isUserFetchLoading: false,
  users: null,
  tabels: null,

  fetchUsers: async () => {
    try {
      set({ isUserFetchLoading: true });
      let res = await axios.get(API_URL + "/airtel/user");
      set({ users: res.data.data });
    } catch (error) {
      toast.error("Internal server error");
      set({ isUserFetchLoading: false });
    }
  },
  fetchTables: async () => {
    try {
      let res = await axios.get(API_URL + "/airtel/table");
      set({ tabels: res.data.data });
    } catch (error) {
      toast.error("Internal server error");
    }
  },

  AddNewMember: async (data) => {
    try {
      const { _id, ...reqbody } = data;
      let createUserRes = await axios.post(API_URL + "/airtel/user", reqbody);
      let newuser: UserInterface = createUserRes.data.data;

      let prevTableData = [...(get().tabels ?? [])];
      let tableBody = prevTableData.find(
        (e) => e.tableNumber == newuser.tableNumber
      );

      if (!tableBody) {
        toast.error("somethign went wrong");
        return;
      }
      let newUserIds = tableBody.users.map((e) => e._id);
      newUserIds.push(newuser._id);
      // @ts-ignore
      tableBody.users = newUserIds;

      let updateTable = await axios.post(
        API_URL + "/airtel/table" + newuser.tableNumber,
        tableBody
      );
      get().fetchTables();
      get().fetchUsers();
      toast.success("User created sucessfully");
    } catch (error) {}
  },

  updateTable: async () => {
    let users = get().users ?? [];
    let table: { tableNumber: number; users: string[] }[] = [];
    for (let i = 0; i < users.length; i++) {
      let currentUser = users[i];
      let checktable = table.find(
        (e) => e.tableNumber == currentUser.tableNumber
      );
      if (checktable) {
        checktable.users.push(currentUser._id);
      } else {
        table.push({
          tableNumber: currentUser.tableNumber as number,
          users: [currentUser._id],
        });
      }
    }
    for (let i = 0; i < table.length; i++) {
      let currentTable = table[i];
      console.log(currentTable);
      await axios.post(API_URL + "/airtel/table", currentTable);
    }
    // console.log("table ", table);
  },
  swapMemberSheet: () => {
    const data: {
      user1: UserInterface | null;
      user2: UserInterface | null;
    } = useFeature.getState().swapUserData;
    toast.error("swap data was not save in database we fix this soon");
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

  removeMember: (_id) => {},
}));
