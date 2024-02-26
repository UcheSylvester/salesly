import { CounterMutators, counterMutators } from "@/features/counter";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { Replicache } from "replicache";

export type M = CounterMutators;

const ReplicacheContext = createContext<Replicache<M> | null>(
  null
);

export const ReplicacheProvider = ({children}: PropsWithChildren) => {
  const [rep, setRep] = useState<Replicache<M> | null>(null)

  useEffect(() => {
    if(!process.env.NEXT_PUBLIC_REPLICACHE_LICENSE_KEY) return;

    const rep = new Replicache({
      licenseKey: process.env.NEXT_PUBLIC_REPLICACHE_LICENSE_KEY || '',
      name: `prod-inventory`, // should be unique per user
      mutators: {
        ...counterMutators
      }
    })

    setRep(rep)

    return () => {
      rep.close()
    }
  }, [])

  return (
    <ReplicacheContext.Provider value={rep}>
      {children}
    </ReplicacheContext.Provider>
  );
}

export const useReplicache = () => {
  return useContext(ReplicacheContext)
}

