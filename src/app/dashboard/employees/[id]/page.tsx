"use client";

import { useState, useMemo, useEffect } from "react";
import NavBar from "@/components/general/NavBar/NavBar";
import { Button, Card, Descriptions, Skeleton, Spin, Tabs } from "antd";
import { useSingleEmployeeContext } from "@/context/single-employee.context";
import { useRouter } from "next/navigation";
import { EmployeeBookingsTable } from "@/components/employees/Table/EmployeeBookingsTable";
import { EmployeeSalariesTable } from "@/components/employees/Table/EmployeeSalariesTable";
import { useModalContext } from "@/context/modal.context";
import { EmployeeSalaryAddForm } from "@/components/employees/Form/EmployeeSalaryAddForm";
const tabList = [
    {
        key: "information",
        tab: "Information",
    },
    {
        key: "salary",
        tab: "Salary",
    },
    {
        key: "invoices",
        tab: "Invoices",
    },
    {
        key: "bookings",
        tab: "Bookings",
    },
];

export default function Page({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState<string>("information");
    const { employee, isLoading, setEmployee, invoices, bookings, getSalaries } =
        useSingleEmployeeContext();
    const { addToStack, removeLastFromStack } = useModalContext();
    const router = useRouter();

    useEffect(() => {
        setEmployee(params.id);
    }, [params.id, setEmployee]);

    const Information = useMemo(() => {
        return (
            <>
                <Descriptions bordered style={{ marginBottom: "32px" }}>
                    <Descriptions.Item label="First name" span={24}>
                        {employee?.firstName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Last name" span={24}>
                        {employee?.lastName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email" span={24}>
                        {employee?.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone number" span={24}>
                        {employee?.phoneNumber}
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions title="Address" bordered>
                    <Descriptions.Item label="Line1" span={24}>
                        {employee?.address?.line1}
                    </Descriptions.Item>
                    <Descriptions.Item label="City" span={24}>
                        {employee?.address?.city}
                    </Descriptions.Item>
                    <Descriptions.Item label="Zip" span={24}>
                        {employee?.address?.zip}
                    </Descriptions.Item>
                    <Descriptions.Item label="Country" span={24}>
                        {employee?.address?.country}
                    </Descriptions.Item>
                </Descriptions>
            </>
        );
    }, [employee]);

    const Salary = () => {
        return <EmployeeSalariesTable salaries={getSalaries()} />;
    };

    return (
        <>
            <NavBar
                title={
                    "Employee: " +
                    (employee ? employee?.firstName + " " + employee?.lastName : "")
                }
                onBack={() => router.back()}
                extra={[
                    <Button
                        key="1"
                        type="primary"
                        onClick={() =>
                            addToStack("Add customer", <EmployeeSalaryAddForm onSubmit={console.debug} />)
                        }
                    >
                        Change salary
                    </Button>,
                ]}
            />
            <Spin spinning={isLoading}>
                <Card
                    style={{ width: "100%" }}
                    tabList={tabList}
                    activeTabKey={activeTab}
                    onTabChange={setActiveTab}
                >
                    {activeTab === "information" && Information}
                    {activeTab === "salary" && Salary()}
                    {activeTab === "invoices" && (
                        <EmployeeBookingsTable bookings={invoices} />
                    )}
                    {activeTab === "bookings" && (
                        <EmployeeBookingsTable bookings={bookings} />
                    )}
                </Card>
            </Spin>
        </>
    );
}
