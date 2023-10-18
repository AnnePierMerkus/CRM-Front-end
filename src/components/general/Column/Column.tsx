import React from "react";
import styles from "./column.module.css";

interface ColumnType {
    children: React.ReactNode,
    size: "1/4" | "1/3" | "1/2" | "2/3" | "3/4" | "1/1"
}

export default function Column({children, size}: ColumnType) {
    const sizeToClassMapping = {
        "1/4": styles.column25,
        "1/3": styles.column33,
        "1/2": styles.column50,
        "2/3": styles.column66,
        "3/4": styles.column75,
        "1/1": styles.column100 // Assuming you have a 100% style in your CSS module
    };
    return <div className={`${styles.column} ${sizeToClassMapping[size] || styles.columnAuto}`}>{children}</div>
}