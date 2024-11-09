import { create } from "zustand";
import { EventStoreInerface, UserInterface } from "./types/EventStore";

export const useEventStore = create<EventStoreInerface>((set, get) => ({
  isFetchLoading: false,
  userOnSingleTable: 7,
  users: null,
  tabels: [
    {
      _id: 1,
      tablenumber: 1,
      users: [
        { seatNumber: 1, name: "Asadfjsdfmans,dmfn,amsdnf", email: "as@example.com" },
        { seatNumber: 2, name: "Bs", email: "asdf,amsdfma.s,dbs@example.com" },
        { seatNumber: 3, name: "Cs", email: "cs@example.com" },
        { seatNumber: 4, name: "Ds", email: "ds@example.com" },
        { seatNumber: 5, name: "Es", email: "es@example.com" },
        { seatNumber: 6, name: "Fs", email: "fs@example.com" },
        { seatNumber: 7, name: "Gs", email: "gs@example.com" },
      ],
    },
    {
      _id: 2,
      tablenumber: 2,
      users: [
        { seatNumber: 1, name: "Ak", email: "ak@example.com" },
        { seatNumber: 2, name: "Bk", email: "bk@example.com" },
        { seatNumber: 3, name: "Ck", email: "ck@example.com" },
        { seatNumber: 4, name: "Dk", email: "dk@example.com" },
        { seatNumber: 5, name: "Ek", email: "ek@example.com" },
        { seatNumber: 6, name: "Fk", email: "fk@example.com" },
        { seatNumber: 7, name: "Gk", email: "gk@example.com" },
      ],
    },
    {
      _id: 3,
      tablenumber: 3,
      users: [
        { seatNumber: 1, name: "Al", email: "al@example.com" },
        { seatNumber: 2, name: "Bl", email: "bl@example.com" },
        { seatNumber: 3, name: "Cl", email: "cl@example.com" },
        { seatNumber: 4, name: "Dl", email: "dl@example.com" },
        { seatNumber: 5, name: "El", email: "el@example.com" },
        { seatNumber: 6, name: "Fl", email: "fl@example.com" },
        { seatNumber: 7, name: "Gl", email: "gl@example.com" },
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
}));
