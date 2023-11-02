'use client';

import SimpleSchema from "simpl-schema";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";

export type EmployeeAddFormType = {
    email: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    address?: {
        line1: string;
        city: string;
        zip: string;
        country: string;
    }
}

const schema = new SimpleSchema({
    email: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: {type: String},
    address: { type: Object },
    'address.line1': { type: String },
    'address.city': { type: String },
    'address.zip': { type: String },
    'address.country': { type: String },
})

export const bridge = new SimpleSchema2Bridge({ schema })