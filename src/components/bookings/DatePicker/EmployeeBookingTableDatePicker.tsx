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
    setDate(moment(dateString).set("hour", 0).set("minute", 0).set("second", 0).set("millisecond", 0).toISOString());
  };

  const prevDate = () => {
    setDate(
        moment(date).subtract(1, "days").set("hour", 0).set("minute", 0).set("second", 0).set("millisecond", 0).toISOString()
    );
  };

  const nextDate = () => {
    setDate(
        moment(date).add(1, "days").set("hour", 0).set("minute", 0).set("second", 0).set("millisecond", 0).toISOString()
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
