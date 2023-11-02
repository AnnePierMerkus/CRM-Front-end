'use client';

import React from "react";
import {EmployeeProvider} from "@/context/employee.context";

export default function EmployeeLayout({
                                           children,
                                       }: {
    children: React.ReactNode
}) {
    return <EmployeeProvider>
        {children}
    </EmployeeProvider>
}
