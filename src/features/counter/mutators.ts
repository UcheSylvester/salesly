import { REPLICACHE_KEYS } from "@/constants";
import { WriteTransaction } from "replicache";

export const counterMutators = {
  increment: async(tx: WriteTransaction, data: number) => {
    const prev = (await tx.get(REPLICACHE_KEYS.COUNTER)) || 0;
    const next = (prev as number) + data;

    await tx.set(REPLICACHE_KEYS.COUNTER, next);
    return next;
  },
  decrement: async(tx: WriteTransaction, data: number) => {
    const prev = (await tx.get(REPLICACHE_KEYS.COUNTER)) || 0;
    const next = (prev as number) - data;

    await tx.set(REPLICACHE_KEYS.COUNTER, next);
    return next;
  }
}

export type CounterMutators = typeof counterMutators;

