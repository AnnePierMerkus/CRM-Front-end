'use client';

import React from "react";
import {BookingProvider} from "@/context/booking.context";

export default function BookingLayout({
                                           children,
                                       }: {
    children: React.ReactNode
}) {
    return <BookingProvider>
        {children}
    </BookingProvider>
}
