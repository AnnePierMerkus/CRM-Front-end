"use client";

import NavBar from "@/components/general/NavBar/NavBar";
import SideBar from "@/components/general/SideBar/SideBar";
import styles from "./style.module.css";
import React, { useEffect, useState } from "react";
import { redirect, usePathname } from "next/navigation";
import { init } from "@/services/authentication/AuthenticationService";
import { useRouter } from "next/navigation";
import { ModalProvider } from "@/context/modal.context";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    const pathName = usePathname();

    // const title = sidebarItems.find(i => i.link == pathName)?.title
    const router = useRouter();

    const [authentication, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        if (!authentication) {
            setAuthenticated(true);
            // init()
            //     .then((r) => {
            //         setAuthenticated(true);
            //     })
            //     .catch(async (reason) => {
            //         router.push("/auth/login");
            //     });
        }
    }, []);

    if (!authentication) {
        return <div>loading...</div>;
    }
    return (
        <ModalProvider>
            <div className={styles.wrapper}>
                <div className={styles.side}>
                    <SideBar />
                </div>
                <div className={styles.main}>
                    <div className={styles.container}>
                        {/* <NavBar /> */}
                        {children}
                    </div>
                </div>
            </div>
        </ModalProvider>
    );
}
