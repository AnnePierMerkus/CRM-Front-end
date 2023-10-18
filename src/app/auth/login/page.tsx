'use client';

import styles from "./../style.module.css";
import Button from "@/components/general/Button/Button";

export default function Login() {
    return <>
        <h1>Login</h1>
        <form className={styles.loginForm}>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="username">Username</label>
                <input className={styles.input} type="text" id="username" placeholder="Enter your username" required />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="password">Password</label>
                <input className={styles.input} type="password" id="password" placeholder="Enter your password" required />
            </div>
            <Button variant="primary" onClick={() => console.debug('primary')} type="submit">Primary button</Button>
        </form>
    </>
}