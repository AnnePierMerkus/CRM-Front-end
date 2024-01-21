"use client";

import { useState, useMemo, useEffect } from "react";
import NavBar from "@/components/general/NavBar/NavBar";
import {
    Button,
    Card,
    Descriptions,
    Skeleton,
    Spin,
    Tabs,
    message,
} from "antd";
import { useSingleEmployeeContext } from "@/context/single-employee.context";
import { useRouter } from "next/navigation";
import { EmployeeWagesTable } from "@/components/employees/Table/EmployeeWagesTable";
import { useModalContext } from "@/context/modal.context";
import {
    CreateEmployeeWageType,
    EmployeeWageAddForm,
} from "@/components/employees/Form/EmployeeWageAddForm";
import { EmployeeSalariesTable } from "@/components/employees/Table/EmployeeSalariesTable";
import { updateEmployeeWage } from "@/services/employee/EmployeeWageService";
const tabList = [
    {
        key: "information",
        tab: "Information",
    },
    {
        key: "wage",
        tab: "Wage",
    },
    {
        key: "salary",
        tab: "Salary",
    },
];

export default function Page({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState<string>("information");
    const {
        employee,
        isLoading,
        setEmployee,
        invoices,
        bookings,
        getWages,
        getSalaries,
    } = useSingleEmployeeContext();
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

    const Wage = () => {
        return <EmployeeWagesTable wages={getWages()} />;
    };

    const Salary = () => {
        return <EmployeeSalariesTable salaries={getSalaries()} />;
    };

    const changeAction = (data: CreateEmployeeWageType) => {
        if (employee !== undefined && employee.ID !== undefined)
            updateEmployeeWage(data, employee.ID).then((updatedEmployee) => {
                getWages(true);
                removeLastFromStack();
                message.success("Updated employee wage");
            });
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
                            addToStack(
                                "Change employee wage",
                                <EmployeeWageAddForm onSubmit={changeAction} />
                            )
                        }
                    >
                        Change wage
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
                    {activeTab === "wage" && Wage()}
                    {activeTab === "salary" && Salary()}
                </Card>
            </Spin>
        </>
    );
}
