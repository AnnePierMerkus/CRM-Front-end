import { DatePicker, TimePicker } from "antd";
import { on } from "events";
import { stat } from "fs";
import moment from "moment";
import { HTMLFieldProps, connectField } from "uniforms";
import { AutoField } from "uniforms-antd";

type DateSelectProps = HTMLFieldProps<
    { day: moment.Moment; startTime: moment.Moment|undefined; endTime: moment.Moment|undefined },
    HTMLDivElement
>;
const defaultDates = {
    day: moment(),
    startTime: undefined,
    endTime: undefined,
};

function DateSelect({
                        value: { day, startTime, endTime } = defaultDates,
                        onChange,
                        required,
                        error,
                        errorMessage
                    }: DateSelectProps) {
    const handleTimeChange = (value: any, dateString: string, type: string) => {
        onChange({ ...{ day, startTime, endTime }, [type]: value as moment.Moment });
    };

    return (
        <div>
            <DatePicker
                onChange={(value, dateString) => {
                    onChange({ ...{ day, startTime, endTime }, day: value as moment.Moment });
                }}
                format={"DD-MM-YYYY"}
                placeholder="Select day"
                style={{ width: "100%" }}
                disabledDate={(current) => {
                    return current && current < moment().startOf("day");
                }}
            />
            <TimePicker
                minuteStep={5}
                onChange={(value, dateString) =>
                    handleTimeChange(value, dateString, "startTime")
                }
                format={"HH:mm"}
                placeholder="Select start time"
                style={{ width: "50%" }}
                disabled={day == null}
                disabledTime={(current) => {
                    // disabled time for times in the past
                    if (day != null && day.isSame(moment(), "day")) {
                        const mDay = day as moment.Moment;
                        const currentHour = mDay.hour();
                        const currentMinute = mDay.minute() + 1;
                        const disabledHours = Array.from({ length: currentHour }, (_, index) => index);
                        const disabledMinutes = Array.from({ length: currentMinute }, (_, index) => index);
                        return {
                            disabledHours: () => disabledHours,
                            disabledMinutes: () => disabledMinutes,
                        };
                    } else {
                        return {};
                    }
                }}
            />
            <TimePicker
                minuteStep={5}
                onChange={(value, dateString) =>
                    handleTimeChange(value, dateString, "endTime")
                }
                format={"HH:mm"}
                placeholder="Select end time"
                style={{ width: "50%" }}
                disabled={startTime == null}
                disabledTime={(current) => {
                    if (startTime != null) {
                        const mStartTime = startTime as moment.Moment;
                        const currentHour = mStartTime.hour();
                        const currentMinute = mStartTime.minute() + 1;
                        const disabledHours = Array.from({ length: currentHour }, (_, index) => index);
                        const disabledMinutes = Array.from({ length: currentMinute }, (_, index) => index);
                        return {
                            disabledHours: () => disabledHours,
                            disabledMinutes: () => disabledMinutes,
                        };
                    } else {
                        return {};
                    }
                }}
            />
        </div>
    );
}

export const DateSelectField = connectField(DateSelect);
