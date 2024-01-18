import { MessageType } from "antd/lib/message"
import { CustomerType } from "./customerType"

export interface EmployeeBookingType {
    ID: string,
    start: moment.Moment,
    end: moment.Moment,
    customer: CustomerType,
    type: MessageType,
}