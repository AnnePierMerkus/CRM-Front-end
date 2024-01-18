'use client';

import React from 'react';
import {AutoField, AutoForm, DateField, ErrorsField, SubmitField} from "uniforms-antd";
import {MassageType} from "@/types/massageType";
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';

export type MassageFormCreateType = {
    name: String,
    price: String,
}

const schema = new SimpleSchema({
    name: { type: String },
    price: { type: String },
});

const bridge = new SimpleSchema2Bridge({ schema });

export const MassageTypeCreateForm = ({
                                             onSubmit,
                                             selected,
                                             id,
                                         }: {
    onSubmit: (data: MassageFormCreateType, id?: string | undefined) => void;
    selected?: MassageType;
    id?: string | undefined;
}) => {
    return (
        <AutoForm schema={bridge} onSubmit={(model: any) => onSubmit(model, id)} model={selected}>
            <AutoField name="name" />
            <AutoField name="price" />
            <ErrorsField/>
            <SubmitField />
        </AutoForm>
    );
}