import { ReadTransaction, WriteTransaction } from "replicache";

export type SalesInventoryCreate = Omit<SalesInventory, 'id'>

export type SalesInventory = {
  id: string;
  product: string;
  quantity: number;
  price: number;
  amountPaid: number;
  customer: string;
  status: 'pending' | 'partially paid' | 'fully paid' | 'delivered' | 'cancelled';
}

export type UpdateSalesInventory = Partial<SalesInventory>

export async function listSalesInventories(tx: ReadTransaction): Promise<SalesInventory[]> {
  return await tx.scan<SalesInventory>().values().toArray()
}