import styles from "./employeeBookingShow.module.css";
import { BookingType } from "@/types/bookingType";
import { EmployeeType } from "@/types/employeeType";
import { Col, Divider, Row } from "antd";

export function EmployeebookingShow({
    booking,
    employee,
}: {
    booking: BookingType;
    employee: EmployeeType;
}) {
    interface DescriptionItemProps {
        title: string;
        content: React.ReactNode;
    }

    const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
        <div className={styles.descriptionItem}>
            <p className={styles.descriptionItemLabel}>{title}:</p>
            {content}
        </div>
    );

    const time = booking.start.toLocaleTimeString("default", {
        hour: "2-digit",
        minute: "2-digit",
    }) + " - " + booking.end.toLocaleTimeString("default", {
        hour: "2-digit",
        minute: "2-digit",
    })

    const date = booking.start.toLocaleDateString("default", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    return <div className={styles.wrapper}>
        <p className={styles.descriptionHeader}>Customer</p>
        <Row>
            <Col span={24}>
                <DescriptionItem title="Full Name" content={booking.customer.firstName + " " + booking.customer.lastName} />
            </Col>
            <Col span={24}>
                <DescriptionItem title="Phonenumber" content={booking.customer.phoneNumber} />
            </Col>
        </Row>
        <Divider />
        <p className={styles.descriptionHeader}>Information</p>
        <Row>
            <Col span={24}>
                <DescriptionItem title="Type" content={booking.type.name} />
            </Col>
            <Col span={24}>
                <DescriptionItem title="Date" content={date} />
            </Col>
            <Col span={24}>
                <DescriptionItem title="Time" content={time} />
            </Col>
        </Row>
        <Divider />
        <p className={styles.descriptionHeader}>Employee</p>
        <Row>
            <Col span={24}>
                <DescriptionItem title="Full name" content={employee.firstName + " " + employee.lastName} />
            </Col>
            <Col span={24}>
                <DescriptionItem title="Email" content={employee.email} />
            </Col>
            <Col span={24}>
                <DescriptionItem title="Phonenumber" content={employee.phoneNumber} />
            </Col>
        </Row>
    </div>
}
