import { CounterMutators, counterMutators } from "@/features/Counter";
import { InventoryMutators, inventoryMutators } from "@/features/SalesInventory";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { Replicache } from "replicache";

export type M = CounterMutators & InventoryMutators

const ReplicacheContext = createContext<Replicache<M> | null>(
  null
);

export const ReplicacheProvider = ({children}: PropsWithChildren) => {
  const [r, setR] = useState<Replicache<M> | null>(null)

  useEffect(() => {
    if(!process.env.NEXT_PUBLIC_REPLICACHE_LICENSE_KEY) return;

    const r = new Replicache({
      licenseKey: process.env.NEXT_PUBLIC_REPLICACHE_LICENSE_KEY || '',
      name: `prod-inventory`, // should be unique per user
      mutators: {
        ...counterMutators,
        ...inventoryMutators
      }
    })

    setR(r)

    return () => {
      r.close()
    }
  }, [])

  return (
    <ReplicacheContext.Provider value={r}>
      {children}
    </ReplicacheContext.Provider>
  );
}

export const useReplicache = () => {
  return useContext(ReplicacheContext)
}

