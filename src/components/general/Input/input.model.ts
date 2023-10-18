import {InputHTMLAttributes} from "react";
import {InputState} from "@/components/general/Input/input.type";

export interface InputType<T> extends InputHTMLAttributes<T> {
    state?: InputState | undefined
}
