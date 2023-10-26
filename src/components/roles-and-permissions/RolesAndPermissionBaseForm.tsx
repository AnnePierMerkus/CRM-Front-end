'use client';

import React from 'react';
import {AutoForm} from "uniforms-antd";
import {bridge as schema} from './RolesAndPermissionBaseFormSchema';
import {Form} from 'antd';
import { DatePicker } from 'antd';
export function RolesAndPermissionBaseForm() {
    return <div>
        <AutoForm schema={schema} onSubmit={console.debug}/>


    </div>
}

