"use client";

import moment from "moment";
import { AutoField, AutoForm, ErrorField, ErrorsField, SubmitField } from "uniforms-antd";
import {
    EmployeeBookingAddFormType,
    EmployeeBookingAddRequestType,
    bridgeWithCustomer as schemaWithCustomer,
    bridgeWithoutCustomer as schemaWithoutCustomer,
} from "./EmployeeBookingAddFormSchema";
import { EmployeeSelectField } from "@/components/general/SelectField/EmployeeSelectField";
import { CustomerSelectField } from "@/components/general/SelectField/CustomerSelectField";
import { ModelTransformMode } from "uniforms";
import { MassageTypeSelectField } from "@/components/general/SelectField/MassageTypeSelectField";
import { DateSelectField } from "../DateSelectField/DateSelectField";
import { createBooking, updateBooking } from "@/services/booking/BookingService";
import {
    SolutionOutlined,
    UserOutlined,
    CalendarOutlined,
    CheckSquareOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { PagedForm } from "@/components/general/FormModal/PagedForm";
import { Col, Divider, Row, StepProps, message } from "antd";
import { EmployeeType } from "@/types/employeeType";
import { BookingType } from "@/types/bookingType";

interface ExistingData {
    employee: EmployeeType;
    booking: BookingType;
}

export const EmployeeBookingAddForm = ({ reload, existingData }: { reload?: () => void, existingData?: ExistingData }) => {
    const formRef = useRef(null);

    const [formState, setFormState] = useState<any>(null);


    function transform(mode: ModelTransformMode, model: any) {
        if (formRef.current !== undefined && formRef.current !== null) {
            // @ts-ignore
            setFormState(formRef.current?.state);
        }

        if (mode === "validate") {
            const { day, startTime, endTime } = model.range || {};
            return {
                ...model,
                range: {
                    day: day && day.toISOString(),
                    startTime: startTime && startTime.toISOString(),
                    endTime: endTime && endTime.toISOString(),
                },
            };
        }
        return model;
    }

    const onSubmit = (data: EmployeeBookingAddFormType) => {
        let startDate = moment(data.range.day)
            .startOf("day")
            .add(data.range.startTime.hour(), "hours")
            .add(data.range.startTime.minute(), "minutes");
        let endDate = moment(data.range.day)
            .startOf("day")
            .add(data.range.endTime.hour(), "hours")
            .add(data.range.endTime.minute(), "minutes");

        const requestData: EmployeeBookingAddRequestType = {
            customer: data.customer ?? data._customer,
            employee: data.employee,
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            type: data.type,
        };


        if (existingData !== undefined) {
            updateBooking(existingData.booking._id, requestData).then((success) => {
                if (success && reload !== undefined) {
                    reload();

                    message.success(
                        "Booking updated"
                    );
                }
            });
        } else {
            createBooking(requestData).then((newBooking) => {
                if (newBooking && reload !== undefined) {
                    reload();

                    message.success(
                        "New booking created"
                    );
                }
            });
        }
    };

    let steps: StepProps[] = [
        {
            title: "Type & Employee",
            icon: <SolutionOutlined />,
            // @ts-ignore
            status: formState?.error?.details?.some((d) =>
                [
                    "employee",
                    "type",
                ].includes(d.name)
            )
                ? "error"
                : undefined,
        },
        {
            title: "Date & Time",
            icon: <CalendarOutlined />,
            // @ts-ignore
            status: formState?.error?.details?.some((d) =>
                [
                    "range.day",
                    "range.startTime",
                    "range.endTime",
                ].includes(d.name)
            )
                ? "error"
                : undefined,
        },
    ];

    let items = [
        <>
            <ErrorField name="employee" />
            <ErrorField name="type" />
            <EmployeeSelectField name="employee" />
            <MassageTypeSelectField name="type" />
        </>,
        <>
            <ErrorField name="range.day" />
            <ErrorField name="range.startTime" />
            <ErrorField name="range.endTime" />
            <DateSelectField key={"range"} name="range" />
        </>,
    ];


    if (existingData === undefined) {
        steps.unshift({
            title: "Customer",
            icon: <UserOutlined />,
            // @ts-ignore
            status: formState?.error?.details?.some((d) =>
                [
                    "customer",
                    "_customer.firstName",
                    "_customer.lastName",
                    "_customer.phoneNumber",
                ].includes(d.name)
            )
                ? "error"
                : undefined,
        });

        items.unshift(
            <>
                <CustomerSelectField
                    key={"customer"}
                    name="customer"
                    beforeChange={() => {
                        // @ts-ignore
                        const currentState = formRef.current?.state;
                        delete currentState?.model._customer;
                        // @ts-ignore
                        formRef.current?.setState(currentState);
                    }}
                />
                <ErrorField name="customer" />
                <Divider>Or</Divider>
                <label>Create new customer</label>
                <br />
                <br />
                <Row gutter={16}>
                    <Col span={12}>
                        <AutoField
                            name="_customer.firstName"
                            disabled={!!formState?.model.customer}
                        />
                    </Col>
                    <Col span={12}>
                        <AutoField
                            name="_customer.lastName"
                            disabled={!!formState?.model.customer}
                        />
                    </Col>
                    <Col span={24}>
                        <AutoField
                            name="_customer.phoneNumber"
                            disabled={!!formState?.model.customer}
                        />
                    </Col>
                </Row>
            </>
        )
    }


    if (existingData !== undefined) {
        return <AutoForm
            schema={existingData === undefined ? schemaWithCustomer : schemaWithoutCustomer}
            onSubmit={onSubmit}
            modelTransform={transform}
            ref={formRef}
            model={{
                employee: existingData.employee.ID,
                type: existingData.booking.type.ID,
                range: {
                    day: moment(existingData.booking.start),
                    startTime: moment(existingData.booking.start),
                    endTime: moment(existingData.booking.end),
                },
            }}
        >
            <PagedForm
                steps={steps}
                submitButton={<SubmitField />}
                items={items}
            />
        </AutoForm>
    }

    return (
        <AutoForm
            schema={existingData === undefined ? schemaWithCustomer : schemaWithoutCustomer}
            onSubmit={onSubmit}
            modelTransform={transform}
            ref={formRef}
        >
            <PagedForm
                steps={steps}
                submitButton={<SubmitField />}
                items={items}
            />
        </AutoForm>
    );
};
