export interface UserInterface {
  _id: string | number;
  tableNumber?: number;
  name: string;
  email: string;
}

export interface TableInterface {
  _id: string | number;
  tablenumber: number;
  users: UserInterface[];
}

export interface EventStoreInerface {
  maxUserOnSingleTable: number;
  isFetchLoading: boolean;
  tabels: null | TableInterface[];
  users: null | UserInterface[];
  fetchTables: () => void;
  fetchUsers: () => Promise<void>;
  swapMemberSheet: () => void;
  AddNewMember: (data: UserInterface) => void;
}
