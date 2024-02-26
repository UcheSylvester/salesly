import { WriteTransaction } from "replicache";
import { SalesInventory, SalesInventoryCreate } from "./helpers";
import { nanoid } from "nanoid";

export const inventoryMutators = {
  createInventory: async (tx: WriteTransaction, data: SalesInventoryCreate) => {
    const id = nanoid()
    await tx.set(id, {...data, id})
    return data
  },
  updateInventory: async (tx: WriteTransaction, data: SalesInventory) => {
    const prev = await tx.get(data.id) as SalesInventory
    const next = { ...prev, ...data }

    await tx.set(next.id, next)
    return next
  },
  deleteInventory: async (tx: WriteTransaction, id: string) => {
    await tx.del(id)
    return id
  }
}

export type InventoryMutators = typeof inventoryMutators