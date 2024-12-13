import { create } from 'zustand'
import { BusinessEntity, Invoice, InvoiceInfo, InvoiceItem } from '~/app/schema/invoice';

export type InvoiceState = {
  newInvoice: Partial<Invoice>;
  addSenderInfo: (sender: BusinessEntity) => void;
  addRecipientInfo: (recipient: BusinessEntity) => void;
  addInvoiceInfo: (invoiceInfo: InvoiceInfo) => void;
  addItems: (items: InvoiceItem[]) => void

}

export const useStore = create<InvoiceState>((set) => ({
  newInvoice: {},
  addSenderInfo: ((sender: any) => set((state) => ({ newInvoice: { ...state.newInvoice, sender } }))),
  addRecipientInfo: ((recipient: any) => set((state) => ({ newInvoice: { ...state.newInvoice, recipient } }))),
  addInvoiceInfo: ((invoiceInfo: any) => set((state) => ({ newInvoice: { ...state.newInvoice, invoiceInfo } }))),
  addItems: ((items: any) => set((state) => ({ newInvoice: { ...state.newInvoice, items } })))
}))