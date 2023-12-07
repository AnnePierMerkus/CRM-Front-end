export interface ModalHeaderProps {
    title: string;
    subTitle?: string | undefined | null;
    close: () => void;
    goBack?: () => void;
}
