'use client';

import React from 'react';
import {AutoField, AutoForm, DateField, ErrorsField, SubmitField} from "uniforms-antd";
import {bridge as schema, MassageFormType} from './MassageTypeBaseFormSchema';
import {CustomerFormType} from "@/components/customers/CustomerBaseFormSchema";
import {CustomerType} from "@/types/customerType";
import {MassageType} from "@/types/massageType";

export const MassageTypeBaseForm = ({
                                             onSubmit,
                                             selected,
                                             id,
                                         }: {
    onSubmit: (data: MassageFormType, id?: string | undefined) => void;
    selected?: MassageType;
    id?: string | undefined;
}) => {
    // return <AutoForm schema={schema} onSubmit={(model: any) => onSubmit(model, id)} model={selected} />;
    return (
        <AutoForm schema={schema} onSubmit={(model: any) => onSubmit(model, id)} model={selected}>
            <AutoField name="name" />
            <AutoField name="price" />
            <AutoField name="newPrice" />
            <DateField name="activationDate" showTime={false} />
            <ErrorsField/>
            <SubmitField />
        </AutoForm>
    );
}