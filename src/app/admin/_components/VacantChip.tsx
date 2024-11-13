import { Chip } from "@nextui-org/react";
import React from "react";

interface ChipI {
  maxuser: number;
  currentUser: number;
}
export default function VacantChip({ maxuser, currentUser }: ChipI) {
  if (maxuser - currentUser == 0) {
    return <Chip>Seat Full</Chip>;
  }
  if (maxuser - currentUser < maxuser) {
    return <Chip>vacant seat</Chip>;
  }
}
