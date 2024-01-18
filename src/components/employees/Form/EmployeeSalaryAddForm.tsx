'use client';

import { EmployeeSelectField } from "@/components/general/SelectField/EmployeeSelectField";
import SimpleSchema from "simpl-schema";
import { AutoForm } from "uniforms";
import { AutoField, ErrorsField, SubmitField } from "uniforms-antd";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";

export type CreateEmployeeSalaryType = {
    employee: string;
    type: string;
    amount: string;
    activeFrom: string;
}

const schema = new SimpleSchema({
    employee: { type: String },
    type: { type: String },
    amount: { type: String },
    activeFrom: { type: String },
});

const bridge = new SimpleSchema2Bridge({ schema });

export const EmployeeSalaryAddForm = ({
    onSubmit,
    selected,
    id,
}: {
    onSubmit: (data: CreateEmployeeSalaryType, id?: string | undefined) => void;
    selected?: CreateEmployeeSalaryType;
    id?: string | undefined;
}) => {
    return (
        <AutoForm schema={bridge} onSubmit={(model: any) => onSubmit(model, id)} model={selected}>
            <EmployeeSelectField name="employee" />
            <AutoField name="type" />
            <AutoField name="amount" />
            <AutoField name="activeFrom" />
            <ErrorsField/>
            <SubmitField />
        </AutoForm>
    );
}