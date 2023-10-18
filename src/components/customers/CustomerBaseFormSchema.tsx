'use client';

import Ajv, {JSONSchemaType} from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

type CustomerBaseFormData = {
    firstName: string,
    lastName: string,
    phoneNumber: string
}

const schema: JSONSchemaType<CustomerBaseFormData> = {
    title: "Customer",
    type: 'object',
    properties: {
        firstName: {type: 'string'},
        lastName: {type: 'string'},
        phoneNumber: {type: 'string'}
    },
    required: ['firstName', 'lastName', 'phoneNumber']
}

const ajv = new Ajv({
    allErrors: true,
    useDefaults: true,
    keywords: ['uniforms']
});

function createValidator<T>(schema: JSONSchemaType<T>) {
    const validator = ajv.compile(schema);

    return (model: Record<string, unknown>) => {
        validator(model);
        return validator.errors?.length ? { details: validator.errors } : null;
    };
}

const schemaValidator = createValidator(schema);

export const bridge = new JSONSchemaBridge({
    schema,
    validator: schemaValidator,
});