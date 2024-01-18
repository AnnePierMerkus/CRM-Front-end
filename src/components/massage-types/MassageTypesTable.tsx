"use client";

import { MassageType } from "@/types/massageType";
import { Space, Table, Typography } from "antd";

export function MassageTypesTable({
    messageTypes,
    editName,
    editPrice,
    showPrices,
    deleteAction
}: {
    messageTypes?: MassageType[] | undefined;
    editName: (id: string) => void;
    editPrice: (id: string) => void;
    showPrices: (id: string) => void;
    deleteAction: (id: string) => void;
}) {
    return (
        <Table
            columns={[
                {
                    title: "Name",
                    dataIndex: "name",
                    key: "name",
                },
                {
                    title: "Current price",
                    dataIndex: "price",
                    key: "price",
                },
                {
                    title: "Action",
                    key: "action",
                    render: (_, record) => (
                        <Space size="middle">
                            <Typography.Link
                                onClick={() => editName(record.ID)}
                                style={{ marginRight: 8 }}
                            >
                                Edit name
                            </Typography.Link>
                            <Typography.Link
                                onClick={() => editPrice(record.ID)}
                                style={{ marginRight: 8 }}
                            >
                                Edit price
                            </Typography.Link>
                            <Typography.Link
                                onClick={() => showPrices(record.ID)}
                            >
                                Show prices
                            </Typography.Link>
                        </Space>
                    ),
                },
            ]}
            dataSource={messageTypes?.map((messageType) => {
                return {
                    key: messageType.ID,
                    ID: messageType.ID,
                    name: messageType.name,
                    price: messageType.price,
                };
            })}
        />
    );
}