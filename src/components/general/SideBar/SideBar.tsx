'use client';

import styles from "./sidebar.module.css";
import Link from "next/link";
import {usePathname} from "next/navigation";
import sidebarItems from "@/data/sidebar-items";
import Image from 'next/image'

export default function SideBar() {

    const pathName = usePathname();

    return <div className={styles.sidebar}>
        <div className={styles.logoWrapper}>
            <Image src="/logo.png" alt="logo" width="100" height="100"/>
        </div>
        <div className={styles.groups}>
            {
                sidebarItems.map((group, index) => (
                    <div key={index} className={styles.group}>
                        <p className={styles.groupText}>{group.title}</p>
                        <div className={styles.links}>
                            {
                                group.children.map((link) => (
                                    <Link
                                        key={link.title}
                                        href={link.href}
                                        className={styles.link}
                                        data-active={pathName === link.href}
                                    >
                                        {link.title}
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
}