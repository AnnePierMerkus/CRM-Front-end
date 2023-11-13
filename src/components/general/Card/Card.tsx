import React from "react";
import styles from "./card.module.css";

interface CardPropType {
    children: React.ReactNode,
    className?: string,
}

export default function Card({children, className} : CardPropType) {
    return <div className={`${styles.card} ${className}`}>
        {children}
    </div>
}