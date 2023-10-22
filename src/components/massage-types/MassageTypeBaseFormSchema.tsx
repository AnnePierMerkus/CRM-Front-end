'use client';

import Ajv, {JSONSchemaType} from 'ajv';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';

type MassageTypeBaseFormData = {
    name: string,
    price: number
}

const schema: JSONSchemaType<MassageTypeBaseFormData> = {
    title: "MassageType",
    type: 'object',
    properties: {
        name: {type: 'string'},
        price: {type: 'number'}
    },
    required: ['name', 'price']
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