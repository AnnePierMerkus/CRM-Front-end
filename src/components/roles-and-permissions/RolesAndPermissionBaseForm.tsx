'use client';

import React from 'react';
import {AutoForm} from "uniforms-antd";
import {bridge as schema, RolesAndPermissionFormType} from './RolesAndPermissionBaseFormSchema';
import {Form} from 'antd';
import { DatePicker } from 'antd';
import {MassageFormType} from "@/components/massage-types/MassageTypeBaseFormSchema";
import {MassageType} from "@/types/massageType";
import {RolesAndPermissionType} from "@/types/roles-and-permission-type";
export const RolesAndPermissionBaseForm = ({
                                                  onSubmit,
                                                  selected,
                                                  id,
                                              }: {
    onSubmit: (data: RolesAndPermissionFormType, id?: string | undefined) => void;
    selected?: RolesAndPermissionType;
    id?: string | undefined;
}) => {
    return <div>
        <AutoForm schema={schema} onSubmit={(model: any) => onSubmit(model, id)} model={selected}/>


    </div>
}

