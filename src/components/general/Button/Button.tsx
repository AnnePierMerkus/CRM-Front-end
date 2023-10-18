'use client';

import {ButtonType} from "@/components/general/Button/button.model";
import styles from './button.module.css';

export default function Button({children, variant, outlined, onClick, type}: ButtonType) {
    return <button className={`${styles.button} ${styles[variant]} ${outlined ? styles.outlined : undefined}`} onClick={onClick} type={type}>
        {children}
    </button>
}