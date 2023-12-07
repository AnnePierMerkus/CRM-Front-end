import { Button } from "antd";
import styles from "./employeeBookingTable.module.css";
import { BookingType, EmployeeBookingsType } from "@/types/bookingType";

export default function EmployeeBookingTable({
                                                 bookings,
                                                 addAction
                                             }: {
    bookings: EmployeeBookingsType[];
    addAction: () => void;
}) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.headerColumn}>
                    <p>Employees  <Button onClick={addAction}>Add booking</Button></p>
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
                                {employee.bookings?.map((booking, index) => {
                                    return (
                                        <div className={styles.column} key={index}>
                                            <button onClick={console.debug}>
                                                {booking.start.toLocaleTimeString("default", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                                -
                                                {booking.end.toLocaleTimeString("default", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })
                ) : (
                    <div className={styles.row}>
                        <div className={styles.column}>
                            No bookings for this day
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
