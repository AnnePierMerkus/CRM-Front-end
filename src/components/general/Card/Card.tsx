import React from "react";
import styles from "./card.module.css";

interface CardPropType {
    children: React.ReactNode
}

export default function Card({children} : CardPropType) {
    return <div className={styles.card}>
        {children}
    </div>
}