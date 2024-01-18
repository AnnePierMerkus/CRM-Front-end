import { EmployeeBookingType } from "@/types/employeeBookingType";
import Table, { ColumnsType } from "antd/lib/table";

interface DataType {
    ID: string;
    date: string;
    start: string;
    end: string;
    customer: string;
    type: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: "Date",
        dataIndex: "date",
        key: "date",
        sorter: (a, b) => a.date.localeCompare(b.date),
    },
    {
        title: "Start",
        dataIndex: "start",
        key: "start",
    },
    {
        title: "End",
        dataIndex: "end",
        key: "end",
    },
    {
        title: "Customer",
        dataIndex: "customer",
        key: "customer",
    },
    {
        title: "Type",
        dataIndex: "type",
        key: "type",
    },
];

export function EmployeeBookingsTable({
    bookings,
}: {
    bookings?: EmployeeBookingType[] | undefined;
}) {
    return (
        <Table
            columns={columns}
            dataSource={bookings?.map((booking) => {
                return {
                    ID: booking.ID,
                    date: booking.start.format("DD/MM/YYYY"),
                    start: booking.start.format("HH:mm"),
                    end: booking.end.format("HH:mm"),
                    customer: booking.customer.firstName + " " + booking.customer.lastName,
                    type: booking.type.name,
                } as DataType;
            })}
            rowKey="ID"
        />
    );
}
