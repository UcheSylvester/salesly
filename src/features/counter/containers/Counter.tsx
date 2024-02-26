import { REPLICACHE_KEYS } from "@/constants"
import { useReplicache } from "@/providers/ReplicacheProvider"
import { Button, Group, Stack, Text } from "@mantine/core"
import { ReactNode } from "react"
import { useSubscribe } from "replicache-react"

export const Counter = () => {
  const r = useReplicache()

  const count = useSubscribe(r, async tx => {
    const c = await tx.get(REPLICACHE_KEYS.COUNTER)
    return c || 0;
  })

  return (
    <Group>
      <Button onClick={() => r?.mutate.decrement(1)}>Decrease</Button>
      <Text>{count as ReactNode}</Text>
      <Button onClick={() => r?.mutate.increment(1)}>Increase</Button>
    </Group>
  )
}