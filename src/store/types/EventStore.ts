export interface UserInterface {
  _id: string;
  tableNumber?: number;
  name: string;
  email: string;
  phoneNumber?: string;
}

export interface TableInterface {
  _id: string;
  tableNumber: number;
  users: UserInterface[];
}

export interface EventStoreInerface {
  maxUserOnSingleTable: number;
  isFetchLoading: boolean;
  isUserFetchLoading:boolean;
  tabels: null | TableInterface[];
  users: null | UserInterface[];
  fetchTables: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  swapMemberSheet: () => void;
  AddNewMember: (data: UserInterface) => void;
  removeMember: (_id: string) => void;
}
