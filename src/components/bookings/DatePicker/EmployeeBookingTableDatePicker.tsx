import { Button, DatePicker, DatePickerProps } from "antd";
import styles from "./employeeBookingTableDatePicker.module.css";
import moment from "moment";
import Card from "../../general/Card/Card";

export function EmployeeBookingTableDatePicker({
  date,
  setDate,
}: {
  date: string
  setDate: (date: string) => void;
}) {
  const onChange: DatePickerProps["onChange"] = (_, dateString) => {
    setDate(dateString + "T00:00:00.000Z");
  };

  const prevDate = () => {
    setDate(
      moment(date).subtract(1, "days").format("YYYY-MM-DD") + "T00:00:00.000Z"
    );
  };

  const nextDate = () => {
    setDate(
      moment(date).add(1, "days").format("YYYY-MM-DD") + "T00:00:00.000Z"
    );
  };

  return (
    <Card className={styles.wrapper}>
      <Button onClick={prevDate}>prev</Button>
      <DatePicker onChange={onChange} value={moment(date)} allowClear={false} />
      <Button onClick={nextDate}>next</Button>
    </Card>
  );
}
