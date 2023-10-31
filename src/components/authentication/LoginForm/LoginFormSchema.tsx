'use client';

import SimpleSchema from "simpl-schema";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";

export type LoginFormType = {
    email: string,
    password: string
}

const schema = new SimpleSchema({
    email: {type: String},
    password: {type: String},
})

export const bridge = new SimpleSchema2Bridge({
    schema
});
