"use client";

import { InvoiceType } from "@/types/invoiceType";
import { Table } from "antd";
import moment from "moment";

export function InvoiceTable({
    invoices,
    isLoading
}: {
    invoices: InvoiceType[],
    isLoading: boolean
}) {
    return (
        <Table 
            columns={[
                {
                    title: "Number",
                    dataIndex: "number",
                    key: "number",
                },
                {
                    title: "Date",
                    dataIndex: "date",
                    key: "date",
                    render: (date: Date) => moment(date).format("DD/MM/YYYY")
                },
                {
                    title: 'Time',
                    dataIndex: 'time',
                    key: 'time',
                },
                {
                    title: 'Price',
                    dataIndex: 'price',
                    key: 'price',
                },
                {
                    title: 'Customer',
                    dataIndex: 'customerName',
                    key: 'customerName',
                },
                {
                    title: 'Employee',
                    dataIndex: 'employeeName',
                    key: 'employeeName',
                }
            ]}
            dataSource={invoices}
        />
    )
}