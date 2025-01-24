import { Separator, Table, TableBody, TableDataCell, TableHead, TableHeadCell, TableRow } from "react95";
import { useStore } from "../../store";
import { shallow } from "zustand/shallow";

export const BankViewerWindow = () => {
  const balance = useStore(state => state.money);
  const lineitems = useStore(state => {
    const items = [...state.bankLineItems]
    items.reverse()
    return items;
  }, shallow)
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
      <div style={{}}>
        Freedom Savings Account
      </div>
      <Separator />
      <div style={{}}>
        Current Balance: ${balance}
      </div>
      <Separator />
      <div style={{ flexGrow: 1, overflow: 'scroll', position: 'relative' }}>
        <Table style={{ position: 'absolute', width: '100%', height: '100%' }}>
          <TableHead>
            <TableRow>
              <TableHeadCell>Date</TableHeadCell>
              <TableHeadCell>Description</TableHeadCell>
              <TableHeadCell>Amount</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lineitems.map((item, i) =>
              <TableRow key={i}>
                <TableDataCell>{item.date.getDate()}/{item.date.getMonth() + 1}/{item.date.getFullYear()}</TableDataCell>
                <TableDataCell>{item.description}</TableDataCell>
                <TableDataCell style={{ textAlign: 'right' }}>{item.amount}</TableDataCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}