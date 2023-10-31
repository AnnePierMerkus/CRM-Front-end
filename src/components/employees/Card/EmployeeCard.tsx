import React from 'react';
import { Avatar, Card } from "antd";
import { CalendarOutlined, EditOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { EmployeeType } from "@/types/employeeType";
import styles from './employeeCard.module.css';

export function EmployeeCard({ firstname, lastname, ID, phoneNumber }: EmployeeType) {
    // Define a function to open WhatsApp with the phone number
    const openWhatsApp = () => {
        const phone = encodeURIComponent(phoneNumber); // Encode the phone number
        const url = `https://api.whatsapp.com/send?phone=${phone}&text=Hallo, dit is een bericht verstuurd van mijn PHPStorm IDE.`;// `https://api.whatsapp.com/send?phone=${phone}`; // Create the WhatsApp URL
        window.open(url); // Open WhatsApp Web in a new window or tab
    };

    return (
        <Card
            key={ID}
            className={styles.card}
            cover={
                <img
                    alt="example"
                    src="http://via.placeholder.com/640x360"
                />
            }
            actions={[
                <CalendarOutlined key="schedule" />,
                <EditOutlined key="edit" />,
            ]}
        >
            <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={<a href={`employees/${firstname}`}>{firstname + " " + lastname}</a>}
                // Add a link to open WhatsApp with the phone number
                description={<a href="#" onClick={openWhatsApp}>{phoneNumber}</a>}
            />
        </Card>
    );
}
