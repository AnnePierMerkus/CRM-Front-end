'use client';

import SimpleSchema from "simpl-schema";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";


const schema = new SimpleSchema({
    password: {type: String},
    repeatPassword: {type: String}
})

export const bridge = new SimpleSchema2Bridge({
    schema
});
