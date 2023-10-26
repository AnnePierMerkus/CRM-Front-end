'use client';

import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from "simpl-schema";


const schema = new SimpleSchema({
    name: { type: String },
    employees: {type: String},
    customers: {type: String},
    select: {
        type: String,
        allowedValues: ["flightCard", "accommodationCard"],
        defaultValue: "None"
    },
    date: { type: Date },
});

export const bridge = new SimpleSchema2Bridge({ schema });