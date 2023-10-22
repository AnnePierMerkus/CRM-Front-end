import React from 'react';
import styles from './style.module.css';

export default function AuthLayout({
    children,
}: {
children: React.ReactNode
}) {
    return (
        <div className={styles.loginPage}>
            <div className={styles.backgroundPanel}>
                <div className={styles.leftBackground}></div>
                <div className={styles.rightBackground}></div>
            </div>
            <div className={styles.centeredPanel}>
                <div className={styles.leftCenterPanel}>
                    <img src="/logo.png" alt="Company-Logo" className={styles.logo} />
                    <p className={styles.text}>
                        Health spa & wellness center, fully equipped for therapeutic and recreational spa & massage treatment
                    </p>
                </div>

                <div className={styles.rightCenterPanel}>
                    {children}
                </div>
            </div>
        </div>
    );
}
