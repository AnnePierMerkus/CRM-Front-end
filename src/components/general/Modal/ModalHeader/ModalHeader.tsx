import {ModalHeaderProps} from "@/components/general/Modal/ModalHeader/modalHeader.model";
import styles from "./modalHeader.module.css";
import {CrossIcon} from "@/components/general/Icon/Icon";

export function ModalHeader({title, subTitle, close}: ModalHeaderProps) {
    return <div className={styles.modalHeader}>
        <div className={styles.modalHeaderText}>
            <h3>{title}</h3>
            {subTitle !== undefined ? <p>{subTitle}</p> : ""}
        </div>
        <CrossIcon size={"normal"} onClick={close} className={`${styles.modalHeaderClose}`} />
    </div>
}
