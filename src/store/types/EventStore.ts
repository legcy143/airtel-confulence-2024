export interface UserInterface {
  seatNumber: number;
  tableNumber?:number;
  name: string;
  email: string;
}

export interface TableInterface {
  _id: string | number;
  tablenumber: number;
  users: UserInterface[];
}

export interface EventStoreInerface {
  userOnSingleTable: number;
  isFetchLoading: false;
  tabels: null | TableInterface[];
  users: null | UserInterface[];
  fetchTables: () => void;
  fetchUsers: () => void;
}
