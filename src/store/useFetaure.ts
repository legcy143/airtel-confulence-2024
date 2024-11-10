import { create } from "zustand";
import { useEventStore } from "./useEventStore";
import { UserInterface } from "./types/EventStore";
import { toast } from "sonner";

interface store {
  swapUserData: {
    user1: UserInterface | null;
    user2: UserInterface | null;
  };
  SetSwapperData: (data: any, isFor: number) => void;
  resetSwapperData: () => void;
  filteredData: UserInterface[];
  SearchUser: (keyword: string) => void;
  resteFilterData: () => void;
}

export const useFeature = create<store>((set, get) => ({
  swapUserData: {
    user1: null,
    user2: null,
  },

  SetSwapperData: (data: any, isFor) => {
    let prev = get().swapUserData;
    if (isFor == 1) {
      set({
        swapUserData: { ...prev, user1: data },
      });
    } else {
      set({
        swapUserData: { ...prev, user2: data },
      });
    }
  },
  resetSwapperData: () => {
    set({ swapUserData: { user1: null, user2: null } });
  },

  filteredData: [],
  SearchUser: async(keyword) => {
    let users = useEventStore.getState().users;
    if (!users) {
      await useEventStore.getState().fetchUsers();
    }
    if (keyword?.length < 1) {
      set({ filteredData: [] });
      return;
    }
    keyword = keyword.toLowerCase();
    let filtered = users?.filter((e) => {
      if (e.name.toLowerCase().startsWith(keyword) || e.email.toLowerCase().startsWith(keyword)) {
        return e;
      }
    })?.slice(0,5);
    set({ filteredData: filtered });
  },
  resteFilterData: () => {
    set({ filteredData: [] });
  },
}));
