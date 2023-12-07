"use client";

import SimpleSchema from "simpl-schema";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";

export type EmployeeBookingAddFormType = {
    customer: String;
    employees: String;
    range: {
        day: moment.Moment;
        startTime: moment.Moment;
        endTime: moment.Moment;
    };
    type: String;
};

export type EmployeeBookingAddRequestType = {
    customer: String;
    employee: String;
    start: String,
    end: String,
    type: String;
}

const schema = new SimpleSchema({
    customer: { type: String},
    employees: { type: String },
    range: { type: Object },
    'range.day': {type: Date},
    'range.startTime': {type: Date},
    'range.endTime': {type: Date},
    type: {type: String}
});

export const bridge = new SimpleSchema2Bridge({ schema });