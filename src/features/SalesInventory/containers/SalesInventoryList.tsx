import { useReplicache } from "@/providers/ReplicacheProvider"
import { Container, List, Stack, Text, Title } from "@mantine/core"
import { useSubscribe } from "replicache-react"
import { listSalesInventories } from "../helpers"
import { useRouter } from "next/router"

export const SalesInventoryList = () => {
  const router = useRouter()
  const r = useReplicache()
  const sales = useSubscribe(r, listSalesInventories, {default: []})

  return (
    <Container>
      <Stack spacing="xl">
        <Title>Sales Inventory List</Title>
        <List spacing={10}>
          {
            sales.map(sale => (
              <List.Item key={sale.id} onClick={() => router.push(`/inventory/${sale.id}`)} sx={{
                height: '50px',
                borderBottom: `1px solid #e1e1e1`,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}>
                <Text>
                  {sale.product} - {sale.customer} - {sale.quantity} - ${sale.price} - ${sale.amountPaid} - {sale.status}
                </Text>
              </List.Item>
            ))
          }

        </List>
      </Stack>
    </Container>
  )
}
