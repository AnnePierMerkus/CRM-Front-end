'use client';

import React, { useState } from 'react';
import { Alert, Card, Tabs } from 'antd';
import NavBar from '@/components/general/NavBar/NavBar';
import { EmployeeBookingsTable } from '@/components/employees/Table/EmployeeBookingsTable';
import { useBookingHistoryContext } from '@/context/booking-history.context';
import { InvoiceTable } from '@/components/invoice/InvoiceTable';

export default function Page() {
    const [activeTab, setActiveTab] = useState<string>("invoices");

    const { bookings, invoices, isLoading, newInvoices } = useBookingHistoryContext();

    return (
        <>
            <NavBar title="Booking History" />
            <Card
                style={{ width: "100%" }}
                tabList={[
                    {
                        key: "invoices",
                        tab: "Invoices",
                    },
                    {
                        key: "canceled",
                        tab: "Canceled Bookings",
                    },
                ]}
                activeTabKey={activeTab}
                onTabChange={setActiveTab}

            >
                {activeTab === "invoices" && <>
                    {
                        newInvoices !== 0 ? <>
                            <Alert message={`A total of '${newInvoices}' invoices have been created`} type="success" showIcon closable />
                            <br />
                        </> : ''
                    }
                    <InvoiceTable isLoading={isLoading} invoices={invoices} />
                </>}
                {activeTab === "canceled" && <EmployeeBookingsTable bookings={bookings} />}
            </Card>
        </>
    );
}
