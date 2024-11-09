import { create } from "zustand";
import {
  EventStoreInerface,
  TableInterface,
  UserInterface,
} from "./types/EventStore";
import { toast } from "sonner";
import { useFeature } from "./useFetaure";
import { data } from "framer-motion/client";

function swapUsers(
  prevTable: TableInterface[],
  user1: UserInterface,
  user2: UserInterface
) {
  const tableIndex1 = prevTable.findIndex(
    (table) => table.tablenumber === user1.tableNumber
  );
  const tableIndex2 = prevTable.findIndex(
    (table) => table.tablenumber === user2.tableNumber
  );
  if (tableIndex1 === -1 || tableIndex2 === -1) {
    console.error("One or both tables not found");
    return prevTable;
  }
  let updatedTable = prevTable;
  if (tableIndex2 === tableIndex1) {
    updatedTable = prevTable.map((table: any, index: any) => {
      if (index === tableIndex1 && index == tableIndex1) {
        const updatedUsers = table.users.map((user: UserInterface) =>
          user.seatNumber === user1.seatNumber
            ? {
                ...user2,
                seatNumber: user1.seatNumber,
              }
            : user.seatNumber === user2.seatNumber
            ? {
                ...user1,
                seatNumber: user2.seatNumber,
              }
            : user
        );
        return { ...table, users: updatedUsers };
      }
      return table;
    });
  } else {
    updatedTable = prevTable.map((table: any, index: any) => {
      if (index === tableIndex1) {
        // Update the table containing user1 data
        const updatedUsers = table.users.map((user: UserInterface) =>
          user.seatNumber === user1.seatNumber
            ? {
                ...user2,
                tableNumber: user1.tableNumber,
                seatNumber: user1.seatNumber,
              }
            : user
        );
        return { ...table, users: updatedUsers };
      }

      if (index === tableIndex2) {
        // Update the table containing user2 data
        const updatedUsers = table.users.map((user: any) =>
          user.seatNumber === user2.seatNumber
            ? {
                ...user1,
                tableNumber: user2.tableNumber,
                seatNumber: user2.seatNumber,
              }
            : user
        );
        return { ...table, users: updatedUsers };
      }
      return table;
    });
  }
  return updatedTable;
}

export const useEventStore = create<EventStoreInerface>((set, get) => ({
  isFetchLoading: false,
  userOnSingleTable: 7,
  users: null,
  tabels: [
    {
      _id: 1,
      tablenumber: 1,
      users: [
        {
          _id: 1,
          seatNumber: 1,
          tableNumber: 1,
          name: "John Smith",
          email: "john.smith@example.com",
        },
        {
          _id: 2,
          seatNumber: 2,
          tableNumber: 1,
          name: "Emily Davis",
          email: "emily.davis@example.com",
        },
        {
          _id: 3,
          seatNumber: 3,
          tableNumber: 1,
          name: "Michael Brown",
          email: "michael.brown@example.com",
        },
      ],
    },
    {
      _id: 2,
      tablenumber: 2,
      users: [
        {
          _id: 4,
          seatNumber: 1,
          tableNumber: 2,
          name: "Anna Taylor",
          email: "anna.taylor@example.com",
        },
        {
          _id: 5,
          seatNumber: 2,
          tableNumber: 2,
          name: "David Johnson",
          email: "david.johnson@example.com",
        },
        {
          _id: 6,
          seatNumber: 3,
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
          seatNumber: 1,
          tableNumber: 3,
          name: "William Lee",
          email: "william.lee@example.com",
        },
        {
          _id: 8,
          seatNumber: 2,
          tableNumber: 3,
          name: "Olivia Harris",
          email: "olivia.harris@example.com",
        },
        {
          _id: 9,
          seatNumber: 3,
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
          seatNumber: 1,
          tableNumber: 4,
          name: "Charlotte Wilson",
          email: "charlotte.wilson@example.com",
        },
        {
          _id: 11,
          seatNumber: 2,
          tableNumber: 4,
          name: "Henry Adams",
          email: "henry.adams@example.com",
        },
        {
          _id: 12,
          seatNumber: 3,
          tableNumber: 4,
          name: "Amelia Carter",
          email: "amelia.carter@example.com",
        },
      ],
    },
  ],

  fetchUsers: () => {
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
