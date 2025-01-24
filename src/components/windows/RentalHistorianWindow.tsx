import React from "react";
import { Separator, Table, TableBody, TableDataCell, TableHead, TableHeadCell, TableRow, TextInput } from "react95";
import { useStore } from "../../store";

export const RentalHistorianWindow = () => {
  const history = useStore(state => state.rentalHistory);
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.25em' }}>
      {/* Search
      <TextInput />
      <Separator /> */}
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Duration</TableHeadCell>
            <TableHeadCell>Mood</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((item, i) =>
            <TableRow key={i}>
              <TableDataCell>{item.roomMate.fullName}</TableDataCell>
              <TableDataCell>{item.duration}m</TableDataCell>
              <TableDataCell>{item.mood}</TableDataCell>
            </TableRow>)}
        </TableBody>
      </Table>
    </div>
  );
}