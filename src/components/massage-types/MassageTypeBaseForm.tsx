'use client';

import React from 'react';
import {AutoForm} from "uniforms-antd";
import {bridge as schema} from './MassageTypeBaseFormSchema';

export function MassageTypeBaseForm() {
    return <AutoForm schema={schema} onSubmit={console.debug}/>
}