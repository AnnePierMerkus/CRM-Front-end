import React, {MouseEventHandler} from "react";

export interface ButtonType {
    children?: React.ReactNode,
    variant: "primary" | "secondary",
    outlined?: boolean,
    onClick?: MouseEventHandler | undefined,
    type?: 'submit' | 'reset' | 'button' | undefined;
}