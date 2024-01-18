"use client";

import { CustomerFormType } from "@/components/customers/CustomerBaseFormSchema";
import SimpleSchema from "simpl-schema";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";

export type EmployeeBookingAddFormType = {
    customer?: String;
    _customer?: CustomerFormType;
    employee: String;
    range: {
        day: moment.Moment;
        startTime: moment.Moment;
        endTime: moment.Moment;
    };
    type: String;
};

export type EmployeeBookingAddRequestType = {
    customer: String | CustomerFormType | undefined;
    employee: String;
    start: String;
    end: String;
    type: String;
};

const schemaWithCustomer = new SimpleSchema({
    customer: {
        type: String,
        optional: true,
        custom: function () {
            const customer = this.value;
            const _customer = this.field("_customer").value;
            if (!customer && !_customer) {
                return SimpleSchema.ErrorTypes.REQUIRED;
            }
        },
    },
    _customer: {
        type: Object,
        optional: true,
        custom: function () {
            const customer = this.field;
            const _customer = this.value;
            if (!customer && !_customer) {
                return SimpleSchema.ErrorTypes.REQUIRED;
            }
        },
    },
    "_customer.firstName": { type: String },
    "_customer.lastName": { type: String },
    "_customer.phoneNumber": { type: String },
    employee: { type: String },
    range: { type: Object },
    "range.day": { type: Date },
    "range.startTime": { type: Date },
    "range.endTime": { type: Date },
    type: { type: String },
});

const schemaWithoutCustomer = new SimpleSchema({
    employee: { type: String },
    range: { type: Object },
    "range.day": { type: Date },
    "range.startTime": { type: Date },
    "range.endTime": { type: Date },
    type: { type: String },
});

export const bridgeWithCustomer = new SimpleSchema2Bridge({ schema: schemaWithCustomer });
export const bridgeWithoutCustomer = new SimpleSchema2Bridge({ schema: schemaWithoutCustomer });