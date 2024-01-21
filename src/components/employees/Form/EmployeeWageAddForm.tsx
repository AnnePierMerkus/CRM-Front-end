'use client';

import { EmployeeSelectField } from "@/components/general/SelectField/EmployeeSelectField";
import SimpleSchema from "simpl-schema";
import { AutoField, DateField, ErrorsField, SubmitField, AutoForm, HiddenField } from "uniforms-antd";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";

export type CreateEmployeeWageType = {
    type: string;
    amount: string;
    activeFrom: string;
}

const schema = new SimpleSchema({
    type: {
        type: String,
        allowedValues: ["MYR", "%"],
    },
    amount: { type: String },
    activeFrom: { type: String },
});

const bridge = new SimpleSchema2Bridge({ schema });

export const EmployeeWageAddForm = ({
    onSubmit,
    selected,
    id,
}: {
    onSubmit: (data: CreateEmployeeWageType, id?: string | undefined) => void;
    selected?: CreateEmployeeWageType;
    id?: string | undefined;
}) => {
    return (
        <AutoForm schema={bridge} onSubmit={(model: any) => onSubmit(model, id)} model={selected}  >
            <AutoField name="type" />
            <AutoField name="amount" />
            <DateField name="activeFrom" showTime={false} />
            <ErrorsField />
            <SubmitField />
        </AutoForm>
    );
}
