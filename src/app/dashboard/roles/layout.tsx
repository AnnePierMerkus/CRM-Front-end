'use client';

import React from "react";
import {RolesAndPermissionProvider} from "@/context/roles-and-permission.context";

export default function RolesAndPermissionLayout({
                                              children,
                                          }: {
    children: React.ReactNode
}) {
    return <RolesAndPermissionProvider>
        {children}
    </RolesAndPermissionProvider>
}
