'use client';

import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from "simpl-schema";

export type MassageFormType = {
    name: String,
    price: String,
    newPrice: String,
}

const schema = new SimpleSchema({
    name: { type: String },
    price: { type: String },
    newPrice: { type: String, optional: true },
    activationDate: { type: Date, optional: true }
});

export const bridge = new SimpleSchema2Bridge({ schema });