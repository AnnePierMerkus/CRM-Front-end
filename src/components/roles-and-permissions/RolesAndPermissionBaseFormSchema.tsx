'use client';

import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from "simpl-schema";


const schema = new SimpleSchema({
    name: {type: String},
    employees: {
        type: String,
        allowedValues: ["None", "View Only", "View and Edit", "Full Access"],
        defaultValue: "None"
    },
    customers: {
        type: String,
        allowedValues: ["None", "View Only", "View and Edit", "Full Access"],
        defaultValue: "None"},
    roles: {
        type: String,
        allowedValues: ["None", "View Only", "View and Edit", "Full Access"],
        defaultValue: "None"
    },
});

export const bridge = new SimpleSchema2Bridge({ schema });