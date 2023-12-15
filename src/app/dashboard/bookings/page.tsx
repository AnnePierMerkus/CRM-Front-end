"use client";

import Card from "@/components/general/Card/Card";
import Column from "@/components/general/Column/Column";
import Row from "@/components/general/Row/Row";
import { useBookingContext } from "@/context/booking.context";
import EmployeeBookingTable from "@/components/bookings/Table/EmployeeBookingTable";
import { EmployeeBookingTableDatePicker } from "@/components/bookings/DatePicker/EmployeeBookingTableDatePicker";
import { FormModal } from "@/components/general/FormModal/FormModal";
import { EmployeeBookingAddForm } from "@/components/bookings/Form/EmployeeBookingAddForm";
import { useModalContext } from "@/context/modal.context";

export default function Page() {
    const { bookings, date, setDate, reload} = useBookingContext();
    const { addToStack, removeLastFromStack } = useModalContext();


    return (
        <>
            <Row>
                <Column size="2/3" />
                <Column size="1/3">
                    <EmployeeBookingTableDatePicker date={date} setDate={setDate} />
                </Column>
            </Row>
            <Row>
                <Column size="1/1">
                    <EmployeeBookingTable bookings={bookings} addAction={() => addToStack("Add booking", <EmployeeBookingAddForm reload={() => {
                        reload();
                        removeLastFromStack();
                    }}/>)}/>
                </Column>
            </Row>
        </>
    );
}
