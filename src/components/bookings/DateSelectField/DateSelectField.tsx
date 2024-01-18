import { Calendar, Col, Row, TimePicker } from "antd";
import { CalendarMode } from "antd/lib/calendar/generateCalendar";
import moment from "moment";
import { HTMLFieldProps, connectField } from "uniforms";
import type { Moment } from 'moment';
import { EmployeeBookingTimePicker } from "../TimePicker/EmployeeBookingTimePicker";
import { useEffect, useState } from "react";

type DateSelectProps = HTMLFieldProps<
    { day: moment.Moment; startTime: moment.Moment | undefined; endTime: moment.Moment | undefined },
    HTMLDivElement
>;
const defaultDates = {
    day: moment(),
    startTime: undefined,
    endTime: undefined,
};

function DateSelect({
    value: { day = defaultDates.day, startTime, endTime } = defaultDates,
    onChange,
    required,
    error,
    errorMessage
}: DateSelectProps) {
    // const [startTimeValue, setStartTimeValue] = useState<string | undefined>(undefined);
    // const [endTimeValue, setEndTimeValue] = useState<string | undefined>(undefined);

    const [startTimeStartTime, setStartTimeStartTime] = useState<string | undefined>(undefined);

    const handleTimeChange = (value: any, type: string) => {
        onChange({ ...{ day, startTime, endTime }, [type]: value as moment.Moment });
    };

    useEffect(() => {
        if (day !== undefined && day.isSame(moment(), "day")) {
            setStartTimeStartTime(moment().format("HH:mm"));
        } else {
            setStartTimeStartTime(undefined);
        }
    }, [day])

    return (
        <div>
            <Row gutter={16}>
                <Col span={12}>
                    <label>Day</label>
                </Col>
                <Col span={6}>
                    <label>Start time</label>
                </Col>
                <Col span={6}>
                    <label>End time</label>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Calendar
                        mode="month"
                        value={day}
                        fullscreen={false}
                        onSelect={(value) => {
                            onChange({ ...{ day, startTime, endTime }, day: value as moment.Moment, startTime: undefined, endTime: undefined });
                        }}
                        disabledDate={(current) => {
                            return current && current < moment().startOf("day");
                        }}
                    />
                </Col>
                <Col span={6}>
                    <EmployeeBookingTimePicker
                        value={startTime?.format("HH:mm")}
                        onChange={(value: string | undefined) => {
                            onChange({ ...{ day, startTime, endTime }, startTime: moment(value, "HH:mm"), endTime: undefined });
                        }}
                        startTimeSlot="08:00"
                        endTimeSlot="16:55"
                        startTime={startTimeStartTime}
                        checkOnStartTime={startTimeStartTime !== undefined}
                    />
                </Col>
                <Col span={6}>
                    <EmployeeBookingTimePicker
                        value={endTime?.format("HH:mm")}
                        onChange={(value: string | undefined) => {
                            onChange({ ...{ day, startTime, endTime }, endTime: moment(value, "HH:mm") });
                        }}
                        startTime={startTime?.format("HH:mm")}
                        checkOnStartTime={true}
                        startTimeSlot="08:05"
                        endTimeSlot="17:00"
                    />
                </Col>
            </Row>
        </div>
    );
}

export const DateSelectField = connectField(DateSelect);
