'use client';

import React from 'react';
import {AutoForm} from "uniforms-antd";
import {bridge as schema} from './CustomerBaseFormSchema';

export function CustomerBaseForm() {
    return <AutoForm schema={schema} onSubmit={console.debug}/>
}