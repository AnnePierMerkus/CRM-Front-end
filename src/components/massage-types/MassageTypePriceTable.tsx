import { MassageTypePrice } from "@/types/massageType";
import { Table } from "antd";
import moment from "moment"; // Import the moment library

export function MassageTypePriceTable({prices}: { prices: MassageTypePrice[]}) {
    return (
        <Table 
            columns={[
                {
                    title: "Price",
                    dataIndex: "price",
                    key: "price",
                },
                {
                    title: "Active from",
                    dataIndex: "activeFrom",
                    key: "activeFrom",
                    render: (activeFrom: moment.Moment) => activeFrom.format("DD/MM/YYYY"), 
                },
            ]}
            dataSource={prices.map((price: MassageTypePrice) => {
                return {
                    key: price.activeFrom.toString(),
                    price: price.price,
                    activeFrom: moment(price.activeFrom)
                }
            })}
        />
    )
}