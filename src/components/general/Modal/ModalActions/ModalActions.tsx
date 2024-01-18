'use client';

import { ModalActionsProps } from "./modalActions.model";
import styles from "./modalActions.module.css";

export function ModalActions({children}: ModalActionsProps) {
    return <div className={styles.modalActions}>
        {children}
    </div>
}
