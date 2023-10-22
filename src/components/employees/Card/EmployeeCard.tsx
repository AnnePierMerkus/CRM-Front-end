'use client';

import {Avatar, Card} from "antd";
import {CalendarOutlined, EditOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import {EmployeeType} from "@/types/employeeType";
import styles from './employeeCard.module.css';

export function EmployeeCard({firstname, lastname, ID, phoneNumber}: EmployeeType) {
    return <Card
        key={ID}
        className={styles.card}
        cover={
            <img
                alt="example"
                src="http://via.placeholder.com/640x360"
            />
        }
        actions={[
            <CalendarOutlined key={"schedule"}/>,
            <EditOutlined key="edit"/>,
        ]}
    >
        <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
            title={firstname + " " + lastname}
            description={phoneNumber}
        />
    </Card>
}
