'use client';

import React, { useState } from 'react';
import { DataTableColumnType } from "@/types/data-table-column-type";
import DataTable from "@/components/general/DataTable/DataTable";
import { MassageTypeBaseForm } from "@/components/massage-types/MassageTypeBaseForm";
import { Tabs } from 'antd';
import { InvoiceType } from "@/types/invoiceType";

const { TabPane } = Tabs;

export default function Page() {
    const columns: DataTableColumnType[] = [
        {
            name: "name",
            title: "Name"
        },
        {
            name: "date",
            title: "Date"
        },
        {
            name: "employee",
            title: "Employee"
        },
        {
            name: "customer",
            title: "Customer",
        },
        {
            name: "type",
            title: "Type",
        },
        {
            name: "discount",
            title: "Discount",
        }
    ]

    const invoices: InvoiceType[] = [...Array(100)].map((x, i) => {
        return {
            ID: i,
            name: `Invoice ${i}`,
            date: 'January 5th, 2024',
            employee: 'Steve Hennessy',
            customer: 'Pierre Merkus',
            type: "Full body",
            discount: "100%"
        }
    });

    // Placeholder data for canceled bookings
    const canceledBookings: InvoiceType[] = [...Array(50)].map((x, i) => {
        return {
            ID: i,
            name: `Canceled Booking ${i}`,
            date: 'February 10th, 2024',
            employee: 'John Doe',
            customer: 'Alice Smith',
            type: "Swedish Massage",
            discount: "0%"
        }
    });

    const form = () => {
        return <MassageTypeBaseForm />
    }

    const [activeTab, setActiveTab] = useState('invoices');

    const handleTabChange = (key: string) => {
        setActiveTab(key);
    }

    return (
        <>
            <Tabs defaultActiveKey={activeTab} onChange={handleTabChange}>
                <TabPane tab="Invoices" key="invoices">
                    {activeTab === 'invoices' && (
                        <DataTable columns={columns} rows={invoices} size={10} form={form()} add={false} edit={true} canDelete={true} />
                    )}
                </TabPane>
                <TabPane tab="Canceled Bookings" key="canceled">
                    {activeTab === 'canceled' && (
                        <DataTable columns={columns} rows={canceledBookings} size={10} form={form()} add={false} edit={true} canDelete={true} />
                    )}
                </TabPane>
            </Tabs>
        </>
    );
}
