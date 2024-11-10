import { TableInterface, UserInterface } from "../types/EventStore";

export function swapUsers(
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
  