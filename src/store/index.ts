import { createWithEqualityFn } from 'zustand/traditional';
import { combine } from 'zustand/middleware';
import { Draft, produce } from 'immer';
import { StoreType } from '../types/StoreType';
export type WithSet<T> = { set: (fn: (draft: Draft<T>) => void) => void } & T;

function createBasicStore<State extends object>(initialState: State) {
  return createWithEqualityFn<WithSet<State>>(
    combine(
      initialState as any,
      set => ({ set: (fn: (draft: Draft<State>) => void) => set(produce(fn)) })
    ));
}

export const initialDate = new Date("1/1/1995")

export const useStore = createBasicStore<StoreType>({
  roomMates: [],
  money: 5000,
  rent: 800,
  date: initialDate,
  bankLineItems: [],
  rentalHistory: [],
})
