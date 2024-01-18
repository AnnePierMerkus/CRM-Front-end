import { getInvoices } from "@/services/invoice/InvoiceService";
import { InvoiceType } from "@/types/invoiceType";
import { createContext, useContext, useEffect, useState } from "react";

type BookingHistoryData = {
    invoices: InvoiceType[],
    newInvoices?: number,
    bookings: any[],
    isLoading: boolean,
}

const defaultValues: BookingHistoryData = {
    invoices: [],
    newInvoices: 0,
    bookings: [],
    isLoading: true,
}

const BookingHistoryContext = createContext<BookingHistoryData>(defaultValues);

export function BookingHistoryProvider({ children }: { children: React.ReactNode }) {
    const [invoices, setInvoices] = useState<InvoiceType[]>([]);
    const [newInvoices, setNewInvoices] = useState<number>(0);
    const [bookings, setBookings] = useState<any[]>([]); // TODO: Replace with BookingType[
    const [isLoading, setLoading] = useState(defaultValues.isLoading);
    
    useEffect(() => {
        setLoading(true);
        getInvoices().then((response: {invoices: InvoiceType[], newInvoices: number}) => {
            setInvoices(response.invoices)
            setNewInvoices(response.newInvoices)
            setLoading(false)
        })
    }, [])
    
    return (
        <BookingHistoryContext.Provider
            value={{invoices, newInvoices, bookings, isLoading}}>
            {children}
        </BookingHistoryContext.Provider>
    )
}

export const useBookingHistoryContext = () => useContext(BookingHistoryContext);