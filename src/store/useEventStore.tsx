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
        { seatnumber: 1, name: "As", email: "as@example.com" },
        { seatnumber: 2, name: "Bs", email: "bs@example.com" },
        { seatnumber: 3, name: "Cs", email: "cs@example.com" },
        { seatnumber: 4, name: "Ds", email: "ds@example.com" },
        { seatnumber: 5, name: "Es", email: "es@example.com" },
        { seatnumber: 6, name: "Fs", email: "fs@example.com" },
        { seatnumber: 7, name: "Gs", email: "gs@example.com" },
      ],
    },
    {
      _id: 2,
      tablenumber: 2,
      users: [
        { seatnumber: 1, name: "Ak", email: "ak@example.com" },
        { seatnumber: 2, name: "Bk", email: "bk@example.com" },
        { seatnumber: 3, name: "Ck", email: "ck@example.com" },
        { seatnumber: 4, name: "Dk", email: "dk@example.com" },
        { seatnumber: 5, name: "Ek", email: "ek@example.com" },
        { seatnumber: 6, name: "Fk", email: "fk@example.com" },
        { seatnumber: 7, name: "Gk", email: "gk@example.com" },
      ],
    },
    {
      _id: 3,
      tablenumber: 3,
      users: [
        { seatnumber: 1, name: "Al", email: "al@example.com" },
        { seatnumber: 2, name: "Bl", email: "bl@example.com" },
        { seatnumber: 3, name: "Cl", email: "cl@example.com" },
        { seatnumber: 4, name: "Dl", email: "dl@example.com" },
        { seatnumber: 5, name: "El", email: "el@example.com" },
        { seatnumber: 6, name: "Fl", email: "fl@example.com" },
        { seatnumber: 7, name: "Gl", email: "gl@example.com" },
      ],
    },
  ],
  fetchUsers: () => {
    let users: UserInterface[] = [];
    get().tabels?.map((e) => {
      if (Array.isArray(e.users)) {
        users?.push(...e.users);
      }
    }) ?? [];
    set({ users });
  },
  fetchTables: () => {
    console.log("api call for fetch table");
  },
}));
