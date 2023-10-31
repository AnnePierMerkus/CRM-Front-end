'use client';

import React from "react";
import {CustomerProvider} from "@/context/customer.context";

export default function CustomerLayout({
                                           children,
                                       }: {
    children: React.ReactNode
}) {
    return <CustomerProvider>
        {children}
    </CustomerProvider>
}
