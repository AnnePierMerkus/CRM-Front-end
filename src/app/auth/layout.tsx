import React from 'react';
import styles from './style.module.css';

export default function AuthLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <div className={styles.loginScreen}>
            <div className={styles.wallpaper}></div>
            <div className={styles.loginPanel}>
                {/*<img src="/logo.png" alt="Company-Logo" className={styles.logo}/>*/}
                {children}
            </div>
        </div>
    );
}
