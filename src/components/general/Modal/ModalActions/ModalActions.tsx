'use client';

import {ModalActionsProps} from "@/components/Modal/ModalActions/modalActions.model";

export function ModalActions({children}: ModalActionsProps) {
    return <div className={"frontend-modal-actions"}>
        {children}
    </div>
}
