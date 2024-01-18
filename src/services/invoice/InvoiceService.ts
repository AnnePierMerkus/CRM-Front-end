import axios from "axios";
import { get } from "http"
import { API_URL, TOKEN } from "../ApiService";
import { InvoiceType } from "@/types/invoiceType";

export async function getInvoices(): Promise<{invoices: InvoiceType[], newInvoices: number}> {
    const response = await axios.get(API_URL + "/invoice", { headers: { 'Authorization': 'Bearer ' + TOKEN } });

    if (response?.data?.success) {
        return {
            invoices: response?.data?.invoices?.map((invoice: any) => {
                return {
                    number: invoice.number,
                    appointment: invoice.appointment,
                    date: invoice.date,
                    time: invoice.time,
                    price: invoice.price,
                    customerName: invoice.customerName,
                    employeeId: invoice.employeeId,
                    employeeName: invoice.employeeName,
                }
            }),
            newInvoices: response?.data?.newInvoices
        }
    }

    return {
        invoices: [],
        newInvoices: 0
    }
}