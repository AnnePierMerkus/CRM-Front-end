import { Button, DatePicker, DatePickerProps } from "antd";
import styles from "./employeeBookingTableDatePicker.module.css";
import moment from "moment";

export function EmployeeBookingTableDatePicker({
  date,
  setDate,
}: {
  date: string
  setDate: (date: string) => void;
}) {
  const onChange: DatePickerProps["onChange"] = (_, dateString) => {
    const selectedDate = moment(dateString).set("hour", 0).set("minute", 0).set("second", 0).set("millisecond", 0).toISOString();
    const currentDate = moment(date).set("hour", 0).set("minute", 0).set("second", 0).set("millisecond", 0).toISOString();
    if (selectedDate >= currentDate) {
      setDate(selectedDate);
    }
  };

  const prevDate = () => {
    const currentDate = moment(date).set("hour", 0).set("minute", 0).set("second", 0).set("millisecond", 0).toISOString();
    const today = moment().set("hour", 0).set("minute", 0).set("second", 0).set("millisecond", 0).toISOString();
    if (currentDate > today) {
      setDate(moment(date).subtract(1, "days").set("hour", 0).set("minute", 0).set("second", 0).set("millisecond", 0).toISOString());
    }
  };

  const nextDate = () => {
    setDate(
      moment(date).add(1, "days").set("hour", 0).set("minute", 0).set("second", 0).set("millisecond", 0).toISOString()
    );
  };

  return (
    <div className={styles.wrapper}>
      <Button onClick={prevDate} disabled={moment(date).isSameOrBefore(moment().startOf("day"))}>prev</Button>
      <DatePicker onChange={onChange} value={moment(date)} allowClear={false} />
      <Button onClick={nextDate}>next</Button>
    </div>
  );
}
