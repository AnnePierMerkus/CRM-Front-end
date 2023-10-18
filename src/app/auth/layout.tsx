import styles from "./style.module.css";
import Image from "next/image";
import React from "react";

export default function AuthLayout({
    children,
}: {
children: React.ReactNode
}) {
    return <div className={styles.loginContainer}>
    <div className={styles.leftPanel}>
        <Image src="/logo.png" alt={"User logo"} width={250} height={250}/>
        <p className={styles.welcomeText}>
            Health spa & wellness center<br />
            fully equipped for therapeutic and recreational spa & massage treatment
        </p>

    </div>
    <div className={styles.rightPanel}>
        {children}
    </div>
</div>
}