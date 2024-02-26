import { NumberInputField } from "@/components/Formik/NumberInputField"
import { TextInputField } from "@/components/Formik/TextInputField"
import { Button, Container, Stack, Title } from "@mantine/core"
import { Form, Formik } from "formik"
import { SalesInventory } from "../helpers"
import { SelectField } from "@/components/Formik/SelectField"
import { useReplicache } from "@/providers/ReplicacheProvider"
import { showNotification } from "@mantine/notifications"
import { useRouter } from "next/router"


export const FormSalesInventory = ({initialValues: _initialValues, id}: {initialValues?: SalesInventoryValues, id?: string}) => {
  const r = useReplicache()
  const router = useRouter()

  const onSubmit = async (values: SalesInventoryValues) => {
    id ? r?.mutate.updateInventory({...values, id}) : r?.mutate.createInventory(values)

    showNotification({
      message: 'Sales Inventory Created',
    })

    router.push('/')
  }

  return (
    <Container>
      <Stack spacing="xl">
        <Title>Create a New Sales</Title>

        <Formik initialValues={{...initialValues, ..._initialValues}} onSubmit={onSubmit}>
          <Form>

            <Stack spacing="xl">
              <TextInputField name="product" label="Name of Product" />
              <TextInputField name="customer" label="Name of Customer" />
              <NumberInputField name="quantity" label="Quantity Bought" />
              <NumberInputField name="price" label="Total Price" />
              <NumberInputField name="amountPaid" label="Amount Paid" />
              <SelectField name="status" label="Status" data={['pending', 'partially paid', 'fully paid', 'delivered', 'cancelled']} />

              <Button type='submit'>Submit</Button>
            </Stack>
          </Form>

        </Formik>
      </Stack>

    </Container>
  )
}

export type SalesInventoryValues = Omit<SalesInventory, 'id'>


const initialValues: SalesInventoryValues = {
  product: "",
  quantity: 0,
  price: 0,
  amountPaid: 0,
  customer: "",
  status: "pending",
}