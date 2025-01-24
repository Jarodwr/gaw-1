import React from 'react';

import { Button, Window, WindowContent, WindowHeader } from "react95";
import { useStore } from '../../store';

export const RentalEventWindow = () => {
  const rentalEvent = useStore(state => state.currentRentEvent);
  const set = useStore(state => state.set);

  const onConfirmClick = () => set(state => {
    if (rentalEvent) {
      state.money += rentalEvent.net;
      state.currentRentEvent = undefined;
      state.bankLineItems.push({
        description: 'rent',
        date: new Date(state.date),
        amount: -state.money
      });
      for (const person of state.roomMates) {
        state.bankLineItems.push({
          description: `rent from ${person.fullName}`,
          date: new Date(state.date),
          amount: person.askingRent
        });
      }
    }
  })
  return (
    <React.Fragment>
      {rentalEvent &&
        <React.Fragment>
          <div style={{ width: '100%', height: '100%', position: 'absolute' }} />
          <Window style={{
            position: 'absolute',
            left: '20%',
            top: '30%',
            width: '20%',
            height: '20%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <WindowHeader style={{ display: 'flex', alignItems: 'center' }}>
              RENT IS DUE!
            </WindowHeader>
            <WindowContent style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1em' }}>
              <div style={{ flexGrow: 1 }}>
                You {rentalEvent.net > 0 ? "gained" : "lost"} a total of ${Math.abs(rentalEvent.net)} this month.
              </div>
              <Button onClick={onConfirmClick}>Ok</Button>
            </WindowContent>
          </Window>
        </React.Fragment>}
    </React.Fragment>
  );
}