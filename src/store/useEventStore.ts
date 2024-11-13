import { create } from "zustand";
import {
  EventStoreInerface,
  TableInterface,
  UserInterface,
} from "./types/EventStore";
import { toast } from "sonner";
import { useFeature } from "./useFetaure";
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

  isSwapUserLoading: false,

  isTableFetchLoading: false,

  users: null,
  tabels: null,

  fetchUsers: async () => {
    try {
      set({ isUserFetchLoading: true });
      let res = await axios.get(API_URL + "/airtel/user");
      set({ users: res.data.data });
    } catch (error) {
      console.log("user fetch error " ,error)
      toast.error("Internal server error");
    } finally {
      set({ isUserFetchLoading: false });
    }
  },
  fetchTables: async () => {
    try {
      set({ isTableFetchLoading: true });
      let res = await axios.get(API_URL + "/airtel/table");
      set({ tabels: res.data.data });
    } catch (error) {
      console.log("table fetch error " ,error)
      toast.error("Internal server error");
    } finally {
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
  swapMemberSheet: async () => {
    try {
      const data: {
        user1: UserInterface | null;
        user2: UserInterface | null;
      } = useFeature.getState().swapUserData;

      let backupUserData = JSON.parse(JSON.stringify(data));

      if (!data.user1) {
        toast.error("Please select user 1 to swap");
        return false;
      }
      if (!data.user2) {
        toast.error("Please select user 2 to swap");
        return false;
      }

      let FullTable: TableInterface[] = JSON.parse(
        JSON.stringify([...(get().tabels ?? [])])
      );
      let indF = FullTable.findIndex(
        (e) => e.tableNumber == data.user1?.tableNumber
      );
      let inds = FullTable.findIndex(
        (e) => e.tableNumber == data.user2?.tableNumber
      );
      // backup table data
      const PrevData1: TableInterface = JSON.parse(
        JSON.stringify(FullTable[indF])
      );
      const PrevData2: TableInterface = JSON.parse(
        JSON.stringify(FullTable[inds])
      );

      const t1Data = JSON.parse(JSON.stringify(FullTable[indF]));
      const t2Data = JSON.parse(JSON.stringify(FullTable[inds]));
      // create new user instead  and remove last user
      try {
        // create new user
        const reqBody1 = {
          name: data.user1?.name,
          email: data.user1?.email,
          tableNumber: data.user2.tableNumber,
          phoneNumber: data.user1?.phoneNumber,
        };
        const reqBody2 = {
          name: data.user2?.name,
          email: data.user2?.email,
          tableNumber: data.user1.tableNumber,
          phoneNumber: data.user2?.phoneNumber,
        };
        if (typeof reqBody1.tableNumber == "string")
          reqBody1.tableNumber = parseInt(reqBody1.tableNumber);
        let createUser1Res = await axios.post(
          API_URL + "/airtel/user",
          reqBody1
        );
        let createUser2Res = await axios.post(
          API_URL + "/airtel/user",
          reqBody2
        );

        data.user1 = createUser1Res.data.data as UserInterface;
        data.user2 = createUser2Res.data.data as UserInterface;

        // delete old user
      } catch (error) {
        // if failed then  return the flow
        return false;
      }

      let t1 = t1Data.users.map((e: UserInterface) => {
        if (e._id == backupUserData.user1?._id) {
          return data.user2?._id;
        }
        return e._id;
      });

      let t2 = t2Data.users.map((e: UserInterface) => {
        if (e._id == backupUserData.user2?._id) {
          return data.user1?._id;
        }
        return e._id;
      });

      // @ts-ignore
      t1Data.users = t1;
      // @ts-ignore
      t2Data.users = t2;

      try {
        const t1Res = await axios.patch(
          API_URL + "/airtel/table/" + t1Data.tableNumber,
          t1Data
        );
        const t2Res = await axios.patch(
          API_URL + "/airtel/table/" + t2Data.tableNumber,
          t2Data
        );
        // delete old data
        try {
          await axios.delete(
            API_URL + "/airtel/user/" + backupUserData.user1._id
          );
          await axios.delete(
            API_URL + "/airtel/user/" + backupUserData.user2._id
          );
        } catch (error) {}
      } catch (error) {
        // delete new data data
        await axios.delete(API_URL + "/airtel/user/" + data.user1._id);
        await axios.delete(API_URL + "/airtel/user/" + data.user2._id);
      }

      // reset every thing
      useFeature.getState().resetSwapperData();
      await get().fetchUsers();
      await get().fetchTables();
      return true;
    } catch (error) {
      toast.error("something went wrong");
      return false;
    } finally {
      set({ isSwapUserLoading: false });
    }
  },
}));
