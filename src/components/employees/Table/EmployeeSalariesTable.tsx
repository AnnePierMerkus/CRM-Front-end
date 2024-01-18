import { EmployeeSalaryType } from "@/types/employeeSalaryType";
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

export function EmployeeSalariesTable({
    salaries,
}: {
    salaries?: EmployeeSalaryType[] | undefined;
}) {
    return (
        <Table
            columns={columns}
            dataSource={salaries?.map((salary) => {
                return {
                    type: salary.type,
                    amount: salary.amount,
                    activeFrom: moment(salary.activeFrom).format("DD/MM/YYYY"),
                    isActive: salary.isActive,
                } as DataType;
            })}
            rowKey="ID"
        />
    );
}