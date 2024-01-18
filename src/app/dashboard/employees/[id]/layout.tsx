'use client';

import React from "react";
import { SingleEmployeeProvider } from "@/context/single-employee.context";

export default function EmployeeViewLayout({
                                           children,
                                       }: {
    children: React.ReactNode
}) {
    return <SingleEmployeeProvider>
        {children}
    </SingleEmployeeProvider>
}
