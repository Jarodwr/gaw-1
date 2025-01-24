import { BankLineItem } from "./BankLineItem";
import { MessengerEvent } from "./MessengerEvent";
import { RentalHistory } from "./RentalHistory";
import { RentEvent } from "./RentEvent";
import { RoomMate } from "./RoomMate"

export type StoreType = {
  roomMates: RoomMate[];
  currentMessengerEvent?: MessengerEvent;
  currentRentEvent?: RentEvent;
  money: number;
  date: Date;
  rent: number;
  bankLineItems: BankLineItem[]
  rentalHistory: RentalHistory[]
}