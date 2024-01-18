'use client';

import { ModalBodyProps } from "./modalBody.model";

export function ModalBody({children}: ModalBodyProps) {
    return <div className={"frontend-modal-body"}>
        {children}
    </div>
}
