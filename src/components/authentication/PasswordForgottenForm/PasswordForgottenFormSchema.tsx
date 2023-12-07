'use client';

import SimpleSchema from "simpl-schema";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";

export type PasswordForgottenFormType = {
    email: string,
}

const schema = new SimpleSchema({
    email: {type: String},
})

export const bridge = new SimpleSchema2Bridge({
    schema
});
