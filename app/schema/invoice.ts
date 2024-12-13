import { z } from "zod"

export const buisnessEntitySchema = z.object({
    name: z.string({ required_error: 'Name is required' }).min(1, 'Name is required'),
    address: z.string({ required_error: 'Address is required' }).min(1, 'Address is required'),
    taxId: z.string().optional()
})

export type BusinessEntity = z.infer<typeof buisnessEntitySchema>

export const InvoiceInfoSchema = z.object({
    invoiceNumber: z.string({ required_error: 'Invoice number is required' }).min(1, 'Name is required'),
    date: z.string({ required_error: 'Date is required' }).min(1, 'Date is required'),
    dueDate: z.string({ required_error: 'Due date is required' }).min(1, 'Due date is required'),

})

export type InvoiceInfo = z.infer<typeof InvoiceInfoSchema>

export const InvoiceitemSchema = z.object({
    name: z.string({ required_error: 'Name is required' }).min(1, 'Name is required'),
    quantity: z.number({ required_error: 'Quantity is required' }).min(1, 'Quantity is required'),
    price: z.number({ required_error: 'Price is required' }).min(1, 'Price is required'),
})

export type InvoiceItem = z.infer<typeof InvoiceitemSchema>



export type Invoice = InvoiceInfo & {
    sender: BusinessEntity;
    recipient: BusinessEntity;
    items: InvoiceItem[]
}