'use client';

import {useEffect} from "react";
import {ModalProps} from "@/components/general/Modal/modal.model";
import styles from "./modal.module.css";

export function Modal({children, show, className}: ModalProps) {

    useEffect(() => {
        const body = document.getElementsByTagName("body")[0];
        const className = 'show-modal';
        if (show) {
            body.classList.add(className)
        } else {
            body.classList.remove(className)
        }
    }, [show]);

    if (!show) return <></>

    return <div className={`${styles.modalWrapper} ${show ? styles.show : undefined}`}>
        <div className={styles.modal}>
            {children}
        </div>
    </div>
}
