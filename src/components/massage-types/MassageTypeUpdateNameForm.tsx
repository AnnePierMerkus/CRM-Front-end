'use client';

import SimpleSchema from "simpl-schema";
import { AutoForm } from "uniforms";
import { AutoField, ErrorsField, SubmitField } from "uniforms-antd";
import SimpleSchema2Bridge from "uniforms-bridge-simple-schema-2";


export type MassageTypeFormUpdateName = {
    name: String,
}

const schema = new SimpleSchema({
    name: { type: String },
});

const bridge = new SimpleSchema2Bridge({ schema });

export const MassageTypeUpdateNameForm = ({
                                             onSubmit,
                                             selected,
                                         }: {
    onSubmit: (data: MassageTypeFormUpdateName) => void;
    selected?: MassageTypeFormUpdateName;
}) => {
    return (
        <AutoForm schema={bridge} onSubmit={(model: any) => onSubmit(model)} model={selected}>
            <AutoField name="name" />
            <ErrorsField/>
            <SubmitField />
        </AutoForm>
    );
}