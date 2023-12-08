'use client';

import React from "react";
import {MassageTypeProvider} from "@/context/massage-types.context";

export default function MassageTypeLayout({
                                           children,
                                       }: {
    children: React.ReactNode
}) {
    return <MassageTypeProvider>
        {children}
    </MassageTypeProvider>
}
