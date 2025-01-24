export type MessengerEvent = {
  fromMateIndex: number;
  concerningMateIndex?: number;
  cost?: number;
  message: string;
}