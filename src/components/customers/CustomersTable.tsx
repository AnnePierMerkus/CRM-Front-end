"use client";

import { CustomerType } from "@/types/customerType";
import { Popconfirm, Space, Table, Typography } from "antd";

interface DataType {
    ID: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export function CustomersTable({
    customers,
    edit,
    deleteAction
}: {
    customers?: CustomerType[] | undefined;
    edit: (id: string) => void;
    deleteAction: (id: string) => void;
}) {
    return (
        <Table
            columns={[
                {
                    title: "First name",
                    dataIndex: "firstName",
                    key: "firstName",
                },
                {
                    title: "Last name",
                    dataIndex: "lastName",
                    key: "lastName",
                },
                {
                    title: "Phone number",
                    dataIndex: "phoneNumber",
                    key: "phoneNumber",
                },
                {
                    title: "Action",
                    key: "action",
                    render: (_, record) => (
                        <Space size="middle">
                            <Typography.Link
                                onClick={() => edit(record.ID)}
                                style={{ marginRight: 8 }}
                            >
                                Edit
                            </Typography.Link>
                            <Popconfirm title="Are you sure？" okText="Yes" cancelText="No"
                                onConfirm={() => deleteAction(record.ID)}>
                                <Typography.Link>
                                    Delete
                                </Typography.Link>
                            </Popconfirm>

                        </Space>
                    ),
                },
            ]}
            dataSource={customers?.map((customer) => {
                return {
                    ID: customer.ID,
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                    phoneNumber: customer.phoneNumber,
                    // lastEmployee: customer.lastEmployee,
                    // lastType: customer.lastType,
                    // options: customer.options
                } as DataType;
            })}
            rowKey="ID"
        />
    );
}
