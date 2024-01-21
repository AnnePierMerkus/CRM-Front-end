import { EmployeeWageType } from "@/types/employeeWageType";
import { Tag } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import moment from "moment";

interface DataType {
    ID: string;
    type: string;
    amount: number;
    activeFrom: string;
    isActive: boolean;
}

const columns: ColumnsType<DataType> = [
    {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        render: (amount: number, record: DataType) => {
            const formattedAmount = `${amount}${record.type === "%" ? record.type : ` ${record.type}`}`;
            return <span>{formattedAmount}</span>;
        }
    },
    {
        title: "Active from",
        dataIndex: "activeFrom",
        key: "activeFrom",
    },
    {
        title: "Currently active",
        dataIndex: "isActive",
        key: "isActive",
        render: (isActive: boolean,) => {
            return isActive ? <Tag color="success">Active</Tag> : undefined;
        },
    },
];

export function EmployeeWagesTable({
    wages,
}: {
    wages?: EmployeeWageType[] | undefined;
}) {
    return (
        <Table
            columns={columns}
            dataSource={wages?.map((wage) => {
                return {
                    type: wage.type,
                    amount: wage.amount,
                    activeFrom: moment(wage.activeFrom).format("DD/MM/YYYY"),
                    isActive: wage.isActive,
                } as DataType;
            })}
            rowKey="ID"
        />
    );
}
