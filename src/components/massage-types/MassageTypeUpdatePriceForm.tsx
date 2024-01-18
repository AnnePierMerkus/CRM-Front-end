'use client';

import SimpleSchema from "simpl-schema";
import { AutoForm } from "uniforms";
import { AutoField, ErrorsField, SubmitField } from "uniforms-antd";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";


export type MassageTypeFormUpdatePrice = {
    price: Number,
    activeFrom: Date,
}

const schema = new SimpleSchema({
    price: { type: Number },
    activeFrom: { 
        type: Date,
        min: new Date()
    },
});

const bridge = new SimpleSchema2Bridge({ schema });

export const MassageTypeUpdatePriceForm = ({
                                             onSubmit,
                                             selected,
                                         }: {
    onSubmit: (data: MassageTypeFormUpdatePrice) => void;
    selected?: MassageTypeFormUpdatePrice;
}) => {
    return (
        <AutoForm schema={bridge} onSubmit={(model: any) => onSubmit(model)} model={selected}>
            <AutoField name="price" />
            <AutoField name="activeFrom" />
            <ErrorsField/>
            <SubmitField />
        </AutoForm>
    );
}