import { createRef, useEffect, useRef, useState } from "react";
import styles from "./employeeBookingTimePicker.module.css";
import { Button } from "antd";
import { time } from "console";


interface TimeSlot {
    id: number;
    time: string;
}



export function EmployeeBookingTimePicker({
    value,
    onChange,
    startTime,
    checkOnStartTime,
    startTimeSlot,
    endTimeSlot
}: {
    value: string | undefined;
    onChange: (value: string | undefined) => void;
    startTime?: string | (() => string);
    checkOnStartTime?: boolean;
    startTimeSlot?: string;
    endTimeSlot?: string;
}) {
    const refs = useRef<(HTMLButtonElement | null)[]>([]);

    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
    const [selected, setSelected] = useState<string | undefined>(undefined);

    const onSelect = (timeSlot: TimeSlot) => {
        if (selected === timeSlot.time) {
            setSelected(undefined);
            onChange(undefined);
            return;
        } else {
            setSelected(timeSlot.time);
            onChange(timeSlot.time);
        }
    }

    useEffect(() => {
        let timeSlots: TimeSlot[] = [];

        let index = 0;
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 5) {
                const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
                if (
                    (startTimeSlot !== undefined && endTimeSlot !== undefined) &&
                    (time >= startTimeSlot && time <= endTimeSlot)
                ) {
                    timeSlots.push({ id: index, time });
                    index++;
                } else if (startTimeSlot === undefined && endTimeSlot === undefined) {
                    timeSlots.push({ id: index, time });
                    index++;
                }
            }
        }

        setTimeSlots(timeSlots);
    }, [startTimeSlot, endTimeSlot]);

    useEffect(() => {
        if (startTime !== undefined) {
            const firstAvailableTimeSlot = timeSlots.find((timeSlot) => timeSlot.time > startTime);
            if (firstAvailableTimeSlot !== undefined) {
                const index = timeSlots.indexOf(firstAvailableTimeSlot);
                if (index < timeSlots.length - 1) {
                    refs.current[timeSlots[index + 1].id]?.scrollIntoView();
                }
                refs.current[firstAvailableTimeSlot.id]?.scrollIntoView();
            }
        }
    }, [startTime, timeSlots]);

    useEffect(() => {
        console.debug('biem')
        setSelected(value);
    }, [value]);


    if (timeSlots.length === 0) return null;
    return (
        <div className={`${styles.wrapper} ${(checkOnStartTime && startTime == undefined) ? styles.disabled : ""}`}>
            {timeSlots.map((timeSlot: TimeSlot, index: number) => (
                <Button
                    ref={(el) => {
                        // @ts-ignore
                        refs.current[index] = el
                    }}
                    key={timeSlot.time}
                    onClick={() => onSelect(timeSlot)}
                    className={styles.button}
                    type={selected === timeSlot.time ? "primary" : "default"}
                    disabled={(checkOnStartTime && startTime == undefined) || (startTime !== undefined && timeSlot.time <= startTime)}
                >
                    {timeSlot.time}
                </Button>
            ))}
        </div>
    );
}