import styles from "./navbar.module.css";
import Image from "next/image";

export default function NavBar() {
    return <div className={styles.navbar}>
        <h1 className={styles.title}>Title</h1>
        <div className={styles.user}>
            <div className={styles.userLogo}>
                <Image src={"/user.svg"} alt={"User logo"} width={40} height={40}/>
            </div>
            <div className={styles.info}>
                <p className={styles.role}>Admin</p>
                <span className={styles.name}>Firstname Lastname</span>
            </div>
        </div>
    </div>
}