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
  isUserCreatingLoading: false,
  isUserDeleteLoading: false,
  isUserUpdateLoading: false,

  isTableFetchLoading: false,

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
      set({ isTableFetchLoading: true });
      let res = await axios.get(API_URL + "/airtel/table");
      set({ tabels: res.data.data });
    } catch (error) {
      toast.error("Internal server error");
      set({ isTableFetchLoading: false });
    }
  },

  updateUser: async (_id, data) => {
    try {
      set({ isUserUpdateLoading: true });
      const { _id, tableNumber, ...reqbody } = data;
      const res = await axios.patch(API_URL + "/airtel/user/" + _id, reqbody);
      await get().fetchUsers();
      await get().fetchTables();
      toast.success("user updated successfully");
      return true;
    } catch (error) {
      toast.error("something went wrong");
      return false;
    } finally {
      set({ isUserUpdateLoading: false });
    }
  },

  deleteUser: async (_id, isRemoveFromTable = true, isToast = true) => {
    try {
      set({ isUserDeleteLoading: true });
      let deluserRes = await axios.delete(API_URL + "/airtel/user/" + _id);
      await get().fetchUsers();
      let tableNumber = deluserRes.data.data?.tableNumber;
      const prevTableData = [...(get().tabels ?? [])];
      let tableBody = prevTableData.find((e) => e.tableNumber == tableNumber);
      if (!tableBody || !isRemoveFromTable) {
        return true;
      }
      let filteruser = tableBody?.users
        ?.filter((e) => e._id != _id)
        ?.map((e) => e._id);
      // @ts-ignore
      tableBody.users = filteruser;

      let updateTable = await axios.patch(
        API_URL + "/airtel/table/" + tableNumber,
        tableBody
      );
      if (isToast) toast.success("user Deleted Successfully");
      return true;
    } catch (error) {
      toast.error("Something went wrong");
      return false;
    } finally {
      set({ isUserDeleteLoading: false });
    }
  },

  AddNewMember: async (data) => {
    try {
      set({ isUserCreatingLoading: true });
      const { _id, ...reqbody } = data;
      if (typeof reqbody.tableNumber == "string")
        reqbody.tableNumber = parseInt(reqbody.tableNumber);
      let createUserRes = await axios.post(API_URL + "/airtel/user", reqbody);
      let newuser: UserInterface = createUserRes.data.data;

      let prevTableData = [...(get().tabels ?? [])];
      let tableBody = prevTableData.find(
        (e) => e.tableNumber == newuser.tableNumber
      );

      if (!tableBody) {
        toast.error("something went wrong");
        return false;
      }
      let newUserIds = tableBody.users.map((e) => e._id);
      newUserIds.push(newuser._id);
      // @ts-ignore
      tableBody.users = newUserIds;
      if (typeof tableBody.tableNumber == "string")
        tableBody.tableNumber = parseInt(tableBody.tableNumber);

      console.log("tableBody ", tableBody);
      try {
        let updateTable = await axios.patch(
          API_URL + "/airtel/table/" + newuser.tableNumber,
          tableBody
        );
        await get().fetchTables();
        await get().fetchUsers();
        toast.success("User created sucessfully");
        return true;
      } catch (error) {
        get().deleteUser(newuser._id, false, false);
        return false;
      }
    } catch (error) {
      toast.error("Internal Server Error");
      return false;
    } finally {
      set({ isUserCreatingLoading: false });
    }
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
