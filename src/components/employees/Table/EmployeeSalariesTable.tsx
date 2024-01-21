import { EmployeeSalaryMonthType } from "@/types/employeeSalaryType";
import Table, { ColumnsType } from "antd/lib/table";

interface DataType {
  ID: string;
  month: string;
  year: string;
  amount: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Month",
    dataIndex: "month",
    key: "month",
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

export function EmployeeSalariesTable({
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
          ID: salary.month + "-" + salary.year,
          month: monthNames[salary.month],
          year: salary.year.toString(),
          amount: salary.amount + " MYR",
        } as DataType;
      })}
      rowKey="ID"
    />
  );
}
