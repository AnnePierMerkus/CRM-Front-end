import { HTMLFieldProps, connectField } from "uniforms";
import { AutoField } from "uniforms-antd";

type RangeProps = HTMLFieldProps<{ start: Date; stop: Date }, HTMLDivElement>;

const defaultDates = { start: new Date(), stop: new Date() };

function Range({ value: { start, stop } = defaultDates }: RangeProps) {
    return (
        <div>
            <AutoField InputLabelProps={{ shrink: true }} name="start" max={stop} />
            <AutoField InputLabelProps={{ shrink: true }} name="stop" min={start} />
        </div>
    );
}

export const RangeField = connectField(Range);