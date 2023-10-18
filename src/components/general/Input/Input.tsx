import {InputType} from "@/components/general/Input/input.model";
import {InputState} from "@/components/general/Input/input.type";

export default function Input(props: InputType<any>) {
    const state: InputState = props.state === undefined ? 'default' : props.state;
    return <input {...props} className={`${props.className}`} />
}
