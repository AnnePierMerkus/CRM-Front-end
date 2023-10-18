'use client';

import NavBar from "@/components/general/NavBar/NavBar";
import SideBar from "@/components/general/SideBar/SideBar";
import styles from "./style.module.css";
import React from "react";
import {usePathname} from "next/navigation";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    const pathName = usePathname();

    // const title = sidebarItems.find(i => i.link == pathName)?.title

    return <div className={styles.wrapper}>
        <div className={styles.side}>
            <SideBar/>
        </div>
        <div className={styles.main}>
            <div className={styles.container}>
                <NavBar/>
                {children}
            </div>
        </div>
    </div>
}