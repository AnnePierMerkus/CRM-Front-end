'use client';

import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from "simpl-schema";


const schema = new SimpleSchema({
    name: { type: String },
    price: {type: String},
});

export const bridge = new SimpleSchema2Bridge({ schema });