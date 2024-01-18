import { Button, Col, Row } from "antd";
import styles from "./employeeBookingTable.module.css";
import { BookingType, EmployeeBookingsType } from "@/types/bookingType";
import { EmployeeType } from "@/types/employeeType";
import { useMemo } from "react";
export default function EmployeeBookingTable({
    bookings,
    actions,
    viewAction,
}: {
    bookings: EmployeeBookingsType[];
    actions: React.ReactNode;
    viewAction: (booking: BookingType, employee: EmployeeType) => void;
}) {
    const getRandomColor = (): string => {
        let color = "";
        do {
            color = Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, "0");
        } while (parseInt(color, 16) < 0xffffff / 2);
        return color;
    };

    const bookingTypes = useMemo(() => {
        let types: {
            name: string;
            color: string;
        }[] = [];
        bookings.forEach((booking) => {
            booking.bookings?.forEach((booking) => {
                if (!types.some((type) => type.name === booking.type.name)) {
                    types.push({
                        name: booking.type.name,
                        color: getRandomColor(),
                    });
                }
            });
        });
        return types;
    }, [bookings]);

    return (
        <Row gutter={16}>
            <Col span={20}>
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <div className={styles.headerColumn}>
                            <p>Employees</p>
                            {actions ?? <></>}
                        </div>
                    </div>
                    <div className={styles.body}>
                        {bookings !== undefined && bookings.length > 0 ? (
                            bookings.map((employee, index) => {
                                return (
                                    <div className={styles.row} key={index}>
                                        <div className={styles.column}>
                                            {employee.employee.firstName} {employee.employee.lastName}
                                        </div>
                                        {employee.bookings
                                            ?.sort((a, b) => a.start.getTime() - b.start.getTime())
                                            .map((booking, index) => {
                                                const color =
                                                    "#" +
                                                    bookingTypes.find((b) => b.name === booking.type.name)
                                                        ?.color;
                                                        console.debug(booking)
                                                return (
                                                    <div className={styles.column} key={index}>
                                                        <button
                                                            onClick={() => viewAction(booking, employee.employee)}
                                                            className={styles.bookingButton}
                                                            style={{
                                                                backgroundColor: color,
                                                                borderColor: color,
                                                            }}

                                                        >
                                                            <p>
                                                                {employee.employee.firstName} {employee.employee.lastName}
                                                            </p>
                                                            <small>
                                                                {booking.start.toLocaleTimeString("default", {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })}
                                                                -
                                                                {booking.end.toLocaleTimeString("default", {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })}
                                                            </small>
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                );
                            })
                        ) : (
                            <div className={styles.row}>
                                <div className={styles.column}>No bookings for this day</div>
                            </div>
                        )}
                    </div>
                </div>
            </Col>
            <Col span={4}>
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <div className={styles.headerColumn}>
                            <p>Massage types</p>
                        </div>
                    </div>
                    <div className={styles.body}>
                        {bookingTypes.map((type, index) => {
                            return (
                                <div className={styles.row} key={index}>
                                    <div className={styles.column}>
                                        <div
                                            className={styles.colorIcon}
                                            style={{ backgroundColor: "#" + type.color }}
                                        ></div>
                                    </div>
                                    <div className={styles.column}>{type.name}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Col>
        </Row>
    );
}
