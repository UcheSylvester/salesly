import { useReplicache } from "@/providers/ReplicacheProvider"
import { ActionIcon, Badge, Button, Container, Group, List, Menu, Stack, Text, Title } from "@mantine/core"
import { useSubscribe } from "replicache-react"
import { SalesInventory, listSalesInventories } from "../helpers"
import { useRouter } from "next/router"
import { MRT_ColumnDef, MantineReactTable, useMantineReactTable } from "mantine-react-table"
import { useMemo } from "react"
import { IconDotsVertical } from "@tabler/icons-react"

export const SalesInventoryList = () => {
  const router = useRouter()
  const r = useReplicache()
  const sales = useSubscribe(r, listSalesInventories, {default: []})
  const columns = useReferralListTableColumn()

  const table = useMantineReactTable({
    columns,
    data: sales || [],
    enablePagination: false,
    enableTableFooter: false,
    enableBottomToolbar: false,
    enableColumnActions: false,
    enableColumnOrdering: false,
    enableTopToolbar: false,
    positionActionsColumn: 'last',
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <Menu position="bottom-end" shadow={'md'} withinPortal={true}>
        <Menu.Target>
          <ActionIcon radius={'sm'} variant="default" ml={'auto'}>
            <IconDotsVertical height={18} width={18} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item onClick={() => router.push(`/inventory/${row.original.id}`)}>
            Edit
          </Menu.Item>
          <Menu.Item onClick={() => r?.mutate.deleteInventory(row.original.id)}>
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    ),
  })

  return (
    <Container size='lg'>
      <Stack spacing={50}>
        <Group position="apart">
          <Title>Sales Inventory</Title>
          <Button onClick={() => router.push('/create')}>Create</Button>
        </Group>

        <MantineReactTable table={table} />
      </Stack>
    </Container>
  )
}


export const useReferralListTableColumn = () => {
  return useMemo<MRT_ColumnDef<SalesInventory>[]>(
    () => [
      {
        accessorKey: 'product',
        header: 'Product',
      },
      {
        accessorKey: 'customer',
        header: 'Customer',
      },
      {
        id: 'quantity',
        header: 'Quantity',
        accessorFn: ({ quantity }) => quantity ? `$${quantity}` : <>--</>,

      },
      {
        accessorKey: 'amountPaid',
        header: 'Amount Paid',
      },
      {
        id: 'status',
        header: 'Status',
        accessorFn: (props) => (
          <Badge>
            {props.status}
          </Badge>
        ),
      },
    ],
    []
  );
};
