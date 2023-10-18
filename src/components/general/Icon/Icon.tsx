import cross from './images/cross-svgrepo-com.svg'
import Image from "next/image";
import styles from './icon.module.css'


export interface BaseIconProps {
    size: "small" | "normal" | "big",
    onClick?: () => void | undefined,
    className?: string
}

export interface IconProps extends BaseIconProps {
    src: string,
    alt: string
}

// icons

export function CrossIcon(props: BaseIconProps) {
    return <Icon src={cross} alt={"cross"} {...props} />
}

// base

export function Icon({src, alt, size, onClick, className}: IconProps) {
    const IconBase = <Image src={src} alt={alt} className={`${styles.icon} ${styles[size]}`}/>
    if (onClick !== undefined)
        return <button onClick={onClick}
                       className={`${styles.iconButton} ${styles[size]} ${className != null ? className : ''}`}>{IconBase}</button>
    else
        return IconBase
}
