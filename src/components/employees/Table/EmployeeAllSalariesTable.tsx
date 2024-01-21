import { EmployeeSalaryMonthType } from "@/types/employeeSalaryType";
import Table, { ColumnsType } from "antd/lib/table";

interface DataType {
    ID: string;
    month: string;
    year: string;
    amount: string;
    name: string;
    employeeId: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (name: string, record: DataType) => {
            return <a href={`/dashboard/employees/${record.employeeId}`}>{name}</a>;
        }
    },
    {
        title: "Month",
        dataIndex: "month",
        key: "month",
        filters: [
            {
                text: "January",
                value: "January",
            },
            {
                text: "February",
                value: "February",
            },
            {
                text: "March",
                value: "March",
            },
            {
                text: "April",
                value: "April",
            },
            {
                text: "May",
                value: "May",
            },
            {
                text: "June",
                value: "June",
            },
            {
                text: "July",
                value: "July",
            },
            {
                text: "August",
                value: "August",
            },
            {
                text: "September",
                value: "September",
            },
            {
                text: "October",
                value: "October",
            },
            {
                text: "November",
                value: "November",
            },
            {
                text: "December",
                value: "December",
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value: string | number | boolean, record: DataType) => record.month.indexOf(value.toString()) === 0
    },
    {
        title: "Year",
        dataIndex: "year",
        key: "year",
    },
    {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
    },
];

export function EmployeeAllSalariesTable({
    salaries,
}: {
    salaries?: EmployeeSalaryMonthType[] | undefined;
}) {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return (
        <Table
            columns={columns}
            dataSource={salaries?.map((salary) => {
                return {
                    ID: salary.month + "-" + salary.year + "-" + salary.employeeId,
                    month: monthNames[salary.month],
                    year: salary.year.toString(),
                    amount: salary.amount + " MYR",
                    name: salary.name,
                    employeeId: salary.employeeId,
                } as DataType;
            })}
            rowKey="ID"
        />
    );
}
