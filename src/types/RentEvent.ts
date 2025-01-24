export type RentEvent = {
  net: number;
  discrepencies: { roomMateIndex: number; difference: number; }[]
}