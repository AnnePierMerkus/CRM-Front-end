import styles from "./employee.module.css";

export default function Employee() {
    return <div className={styles.container}>
        <div className={styles.topPanel}></div>
        <div className={styles.bottomPanel}></div>
    </div>
}