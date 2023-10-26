'use client';

import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from "simpl-schema";


const schema = new SimpleSchema({
    firstName: { type: String },
    lastName: {type: String},
    phoneNumber: {type: String}
});

export const bridge = new SimpleSchema2Bridge({ schema });