"use client";

import Column from "@/components/general/Column/Column";
import Row from "@/components/general/Row/Row";
import { useBookingContext } from "@/context/booking.context";
import EmployeeBookingTable from "@/components/bookings/Table/EmployeeBookingTable";
import { EmployeeBookingTableDatePicker } from "@/components/bookings/DatePicker/EmployeeBookingTableDatePicker";
import { EmployeeBookingAddForm } from "@/components/bookings/Form/EmployeeBookingAddForm";
import { useModalContext } from "@/context/modal.context";
import { BookingType } from "@/types/bookingType";
import { EmployeeType } from "@/types/employeeType";
import { EmployeebookingShow } from "@/components/bookings/Show/EmployeeBookingShow";
import NavBar from "@/components/general/NavBar/NavBar";
import { Button, Popconfirm, message } from "antd";
import { cancelBooking } from "@/services/booking/BookingService";

export default function Page() {
    const { bookings, date, setDate, reload } = useBookingContext();
    const { addToStack, removeLastFromStack } = useModalContext();

    const cancelBookingAction = (id: string) => {
        cancelBooking(id).then(() => {
            message.error("The booking has been cancelled.");
            removeLastFromStack();
        });
    };



    return (
        <>
            <NavBar
                title="Bookings"
                extra={[
                    <Button
                        key="1"
                        type="primary"
                        onClick={() =>
                            addToStack(
                                "Schedule a booking",
                                <EmployeeBookingAddForm
                                    reload={() => {
                                        reload();
                                        removeLastFromStack();
                                    }}
                                />,
                                1000
                            )
                        }
                    >
                        Schedule a booking
                    </Button>,
                ]}
            />
            <Row>
                <Column size="2/3" />
                <Column size="1/3"></Column>
            </Row>
            <Row>
                <Column size="1/1">
                    <EmployeeBookingTable
                        bookings={bookings}
                        actions={
                            <EmployeeBookingTableDatePicker date={date} setDate={setDate} />
                        }
                        viewAction={(booking: BookingType, employee: EmployeeType) => {
                            addToStack(
                                "View booking: " +
                                booking.customer.firstName +
                                " " +
                                booking.customer.lastName,
                                <EmployeebookingShow booking={booking} employee={employee} />,
                                undefined,
                                <>
                                    <Button
                                        type="primary"
                                        onClick={() =>
                                            addToStack(
                                                "Edit booking: " + booking.customer.firstName + " " + booking.customer.lastName + "",
                                                <EmployeeBookingAddForm
                                                    reload={() => {
                                                        reload();
                                                        removeLastFromStack();
                                                        removeLastFromStack();
                                                    }}
                                                    existingData={{booking, employee}}
                                                />
                                            )
                                        }
                                        style={{ marginRight: "16px" }}
                                    >
                                        Edit booking
                                    </Button>
                                    <Popconfirm
                                        title="Are you sure to cancel the booking?"
                                        onConfirm={() => cancelBookingAction(booking._id)}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button type="primary" danger>
                                            Cancel booking
                                        </Button>
                                    </Popconfirm>
                                </>
                            );
                        }}
                    />
                </Column>
            </Row>
        </>
    );
}
