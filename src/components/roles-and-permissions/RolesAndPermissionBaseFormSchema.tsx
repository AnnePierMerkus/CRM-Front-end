'use client';

import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from "simpl-schema";

export type RolesAndPermissionFormType = {
    name: string,
    bookings: string,
    employees: string,
    customers: string,
    massageTypes: string,
    salaries: string,
    bookingHistory: string,
    roles: string,
}

const schema = new SimpleSchema({
    name: {type: String},
    bookings: {
        type: String,
        allowedValues: ["None", "View Only", "View and Edit", "Full Access"],
        defaultValue: "None"
    },
    employees: {
        type: String,
        allowedValues: ["None", "View Only", "View and Edit", "Full Access"],
        defaultValue: "None"
    },
    customers: {
        type: String,
        allowedValues: ["None", "View Only", "View and Edit", "Full Access"],
        defaultValue: "None"
    },
    massageTypes: {
        type: String,
        allowedValues: ["None", "View Only", "View and Edit", "Full Access"],
        defaultValue: "None"
    },
    salaries: {
        type: String,
        allowedValues: ["None", "View Only", "View and Edit", "Full Access"],
        defaultValue: "None"
    },
    bookingHistory: {
        type: String,
        allowedValues: ["None", "View Only", "View and Edit", "Full Access"],
        defaultValue: "None"
    },
    roles: {
        type: String,
        allowedValues: ["None", "View Only", "View and Edit", "Full Access"],
        defaultValue: "None"
    },
});

export const bridge = new SimpleSchema2Bridge({ schema });