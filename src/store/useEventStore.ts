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

export const useEventStore = create<EventStoreInerface>((set, get) => ({
  isFetchLoading: false,
  maxUserOnSingleTable: 3,
  users: null,
  tabels: [
    {
      _id: 1,
      tablenumber: 1,
      users: [
        {
          _id: 1,
          tableNumber: 1,
          name: "John Smith",
          email: "john.smith@example.com",
        },
        {
          _id: 2,
          tableNumber: 1,
          name: "Emily Davis",
          email: "emily.davis@example.com",
        },
      ],
    },
    {
      _id: 2,
      tablenumber: 2,
      users: [
        {
          _id: 4,
          tableNumber: 2,
          name: "Anna Taylor",
          email: "anna.taylor@example.com",
        },
        {
          _id: 5,
          tableNumber: 2,
          name: "David Johnson",
          email: "david.johnson@example.com",
        },
        {
          _id: 6,
          tableNumber: 2,
          name: "Sophia Martinez",
          email: "sophia.martinez@example.com",
        },
      ],
    },
    {
      _id: 3,
      tablenumber: 3,
      users: [
        {
          _id: 7,
          tableNumber: 3,
          name: "William Lee",
          email: "william.lee@example.com",
        },
        {
          _id: 8,
          tableNumber: 3,
          name: "Olivia Harris",
          email: "olivia.harris@example.com",
        },
        {
          _id: 9,
          tableNumber: 3,
          name: "James Walker",
          email: "james.walker@example.com",
        },
      ],
    },
    {
      _id: 4,
      tablenumber: 4,
      users: [
        {
          _id: 10,
          tableNumber: 4,
          name: "Charlotte Wilson",
          email: "charlotte.wilson@example.com",
        },
        {
          _id: 11,
          tableNumber: 4,
          name: "Henry Adams",
          email: "henry.adams@example.com",
        },
        {
          _id: 12,
          tableNumber: 4,
          name: "Amelia Carter",
          email: "amelia.carter@example.com",
        },
      ],
    },
  ],

  fetchUsers: async () => {
    let users: UserInterface[] = [];
    get().tabels?.map((e) => {
      if (Array.isArray(e.users)) {
        let usersWithtable = e.users.map((x) => ({
          tableNumber: e.tablenumber,
          ...x,
        }));
        users?.push(...usersWithtable);
      }
    }) ?? [];
    set({ users });
  },
  fetchTables: () => {
    console.log("api call for fetch table");
  },

  AddNewMember: (data) => {
    // for now i have to use id
    // const {_id,...reqbody} = data;

    let tabels = get()?.tabels ?? [];
    if (!data.tableNumber) return;
    data.tableNumber = +data.tableNumber;
    let tableNumberindex = tabels?.findIndex(
      (e) => e.tablenumber == data.tableNumber
    );

    if (tabels[tableNumberindex]) {
      tabels[tableNumberindex].users.push(data);
      get().fetchUsers();
    }
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
