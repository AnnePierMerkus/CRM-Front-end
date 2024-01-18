'use client';

import { BookingHistoryProvider } from "@/context/booking-history.context";
import React from "react";

export default function BookingHistoryLayout({
                                           children,
                                       }: {
    children: React.ReactNode
}) {
    return <BookingHistoryProvider>
        {children}
    </BookingHistoryProvider>
}