import React, { useCallback, useEffect } from "react";
import { useStore } from "../store";
import { generateNextMessengerEvent } from "../helper/generateNextMessengerEvent";
import { getRandomInt } from "../helper/getRandomInt";


const randomLineItemDescriptions = [
  "Soda",
  "Groceries",
  "Computer Part",
  "Plant",
  "Water",
  "Pool",
  "Beers",
  "Admission"
]

export const SubscriberComponent = () => {

  const set = useStore(state => state.set);

  const onSecondPassed = useCallback(() => set(state => {
    const prevDate = new Date(state.date);
    state.date.setDate(state.date.getDate() + 1);
    state.date = new Date(state.date)
    const currDate = new Date(state.date);
    const differentMonth = currDate.getMonth() !== prevDate.getMonth();

    const nextRentEvent = differentMonth
      ? {
        net: 0,
        discrepencies: []
      }
      : undefined;
    if (nextRentEvent) {
      // Pay rent
      nextRentEvent.net -= state.rent;
      for (const hm of state.roomMates) {
        nextRentEvent.net += hm.askingRent;
      }
    }

    // Every 3rd day add an unforseen cost
    const nextBankLineItem = currDate.getDate() % 3 === 0
      ? {
        date: new Date(currDate),
        description: randomLineItemDescriptions[getRandomInt(0, randomLineItemDescriptions.length - 1)],
        amount: -getRandomInt(5, 30)
      }
      : undefined

    // Every 7th day trigger an event
    const nextMessengerEvent = currDate.getDate() % 7 === 0
      ? generateNextMessengerEvent(state.roomMates)
      : undefined;

    if (nextRentEvent)
      state.currentRentEvent = nextRentEvent;
    if (nextMessengerEvent) {
      if (state.currentMessengerEvent) {
        if (state.currentMessengerEvent.concerningMateIndex !== undefined) {
          state.rentalHistory.push({
            roomMate: state.roomMates[state.currentMessengerEvent.fromMateIndex],
            duration: getRandomInt(1, 10),
            mood: "sad"
          })
          state.roomMates.splice(state.currentMessengerEvent.fromMateIndex, 1);
          state.currentMessengerEvent = undefined;
        } else {
          const from = state.roomMates[state.currentMessengerEvent.fromMateIndex]
          state.bankLineItems.push({
            amount: -(state.currentMessengerEvent?.cost ?? 0),
            description: `Pay back ${from?.fullName}`,
            date: new Date(state.date)
          })
          state.currentMessengerEvent = undefined;
        }
      }
      state.currentMessengerEvent = nextMessengerEvent
    }
    if (nextBankLineItem) {
      state.money += nextBankLineItem.amount
      state.bankLineItems.push(nextBankLineItem);
    }


    if (!state.currentRentEvent) {
      setTimeout(onSecondPassed, 1000);
    }
  }), [])

  useEffect(() => {
    const id = setTimeout(onSecondPassed, 1000)
    return () => clearTimeout(id)
  }, [onSecondPassed]);

  useEffect(() => {
    return useStore.subscribe((currState, prevState) => {
      if (prevState.currentRentEvent && !currState.currentRentEvent) {
        onSecondPassed()
      }
    })
  }, [onSecondPassed])

  return <React.Fragment />
}