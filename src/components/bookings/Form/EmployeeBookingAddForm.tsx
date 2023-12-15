"use client";

import { AutoForm, ErrorField, SubmitField } from "uniforms-antd";
import { EmployeeBookingAddFormType, EmployeeBookingAddRequestType, bridge as schema } from "./EmployeeBookingAddFormSchema";
import { EmployeeSelectField } from "@/components/general/SelectField/EmployeeSelectField";
import { CustomerSelectField } from "@/components/general/SelectField/CustomerSelectField";
import { ModelTransformMode } from "uniforms";
import { MassageTypeSelectField } from "@/components/general/SelectField/MassageTypeSelectField";
import { DateSelectField } from "../DateSelectField/DateSelectField";
import moment from "moment";
import { create } from "domain";
import { createBooking } from "@/services/booking/BookingService";
import {CustomerFormType} from "@/components/customers/CustomerBaseFormSchema";

export const EmployeeBookingAddForm = ({reload}: {reload?: () => void;}) => {
    function transform(mode: ModelTransformMode, model: any) {
        if (mode === 'validate') {
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
        let startDate = moment(data.range.day).startOf("day").add(data.range.startTime.hour(), "hours").add(data.range.startTime.minute(), "minutes");
        let endDate = moment(data.range.day).startOf("day").add(data.range.endTime.hour(), "hours").add(data.range.endTime.minute(), "minutes");

        const requestData: EmployeeBookingAddRequestType = {
            customer: data.customer,
            employee: data.employees,
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            type: data.type,
        };

        console.debug(requestData)

        createBooking(requestData).then(newBooking => {
            if (newBooking && reload !== undefined) {
                reload()
            }
        });
    };

    return (
        <AutoForm schema={schema} onSubmit={onSubmit} modelTransform={transform}>
            <CustomerSelectField name="customer" />
            <ErrorField name="customer">
                <span>You have to provide your last name!</span>
            </ErrorField>
            <EmployeeSelectField name="employees" />
            <ErrorField name="employees">
                <span>You have to provide your last name!</span>
            </ErrorField>
            {/* <RangeField name="range" /> */}
            <DateSelectField name="range" />
            <ErrorField name="range.day">
                <span>day</span>
            </ErrorField>
            <ErrorField name="range.startTime">
                <span>startTime</span>
            </ErrorField>
            <ErrorField name="range.endTime">
                <span>endTime</span>
            </ErrorField>
            <MassageTypeSelectField name="type" />
            <SubmitField />
        </AutoForm>
    );
};
