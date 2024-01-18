import { PageHeader } from "antd";
import styles from "./navbar.module.css";
import Image from "next/image";

export default function NavBar({
    title,
    subtitle,
    extra,
    onBack,
}: {
    title: string;
    subtitle?: string;
    extra?: React.ReactNode[];
    onBack?: () => void | undefined;
}) {
    return (
        <PageHeader
            className={styles.navbar}
            title={title}
            subTitle={subtitle}
            extra={extra}
            onBack={onBack}
        />
    );
}
