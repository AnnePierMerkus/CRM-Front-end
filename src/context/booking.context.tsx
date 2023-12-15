import {BookingType, EmployeeBookingsType} from "@/types/bookingType";
import React, {createContext, useContext, useEffect, useState} from "react";
import {getBookings, getEmployeeBookings} from "@/services/booking/BookingService";
import moment from "moment";

type BookingData = {
    bookings: EmployeeBookingsType[]
    isLoading: boolean,
    date: string,
    setDate: (date: string) => void,
    reload: () => void,
}

const defaultValues: BookingData = {
    bookings: [],
    isLoading: true,
    date: moment().format('YYYY-MM-DD') + "T00:00:00.000Z",
    setDate: (date: string): void => {},
    reload: (): void => {}
}

const BookingContext = createContext<BookingData>(defaultValues);

export function BookingProvider({children}: { children: React.ReactNode }) {
    const [bookings, setBookings] = useState<EmployeeBookingsType[]>([])
    const [isLoading, setLoading] = useState(defaultValues.isLoading);
    const [date, setDate] = useState<string>(defaultValues.date);
    const [_reload, setReload] = useState<number>(0);

    useEffect(() => {
        setLoading(true);
        getEmployeeBookings(date).then(r => {
            setBookings(r)
            setLoading(false)
        })
    }, [date, _reload]);

    const reload = () => {
        setReload(prevState => prevState + 1)
    }

    return (
        <BookingContext.Provider
            value={{bookings, isLoading, date, setDate, reload}}>
            {children}
        </BookingContext.Provider>
    )
}

export const useBookingContext = () => useContext(BookingContext)