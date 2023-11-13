'use client';

import Card from "@/components/general/Card/Card";
import Column from "@/components/general/Column/Column";
import Row from "@/components/general/Row/Row";
import {useBookingContext} from "@/context/booking.context";
import EmployeeBookingTable from "@/components/bookings/Table/EmployeeBookingTable";
import { Button, DatePicker, DatePickerProps } from "antd";
import next from "next";
import moment from 'moment';
import { EmployeeBookingTableDatePicker } from "@/components/bookings/DatePicker/EmployeeBookingTableDatePicker";

export default function Page() {
    const {bookings, date, setDate} = useBookingContext();

    return <>
    <Row>
        <Column size="2/3" />
        <Column size="1/3">
            <EmployeeBookingTableDatePicker date={date} setDate={setDate}/>
        </Column>
    </Row>
        <Row>
            <Column size="1/1">
                <EmployeeBookingTable bookings={bookings} />
            </Column>
        </Row>
    </>
}
