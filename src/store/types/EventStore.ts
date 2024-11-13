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
  isUserCreatingLoading: boolean;
  isUserFetchLoading: boolean;
  isUserDeleteLoading: boolean;
  isUserUpdateLoading: boolean;
  isTableFetchLoading: boolean;
  isSwapUserLoading: boolean;
  tabels: null | TableInterface[];
  users: null | UserInterface[];
  fetchTables: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  deleteUser: (
    _id: string,
    isRemoveFromTable?: boolean,
    isToast?: boolean
  ) => Promise<boolean>;
  updateUser: (_id: string, data: UserInterface) => Promise<boolean>;
  swapMemberSheet: () => Promise<boolean>;
  AddNewMember: (data: UserInterface ,bulkUpload?:boolean) => Promise<boolean>;
}
