import { FormSalesInventory, SalesInventoryValues } from "@/features/SalesInventory";
import { useReplicache } from "@/providers/ReplicacheProvider";
import { useRouter } from "next/router";
import { useSubscribe } from "replicache-react";

export default function Update() {
  const router = useRouter()
  const r = useReplicache()
  const inventory = useSubscribe(r, tx => {
    return tx.get(router.query.id as string)
  })

  if(!inventory) return null

  return (
    <>
      <FormSalesInventory initialValues={inventory as SalesInventoryValues} id={router.query.id as string} />
    </>
  );
}
