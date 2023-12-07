'use client';

import React from 'react';
import {AutoForm, ErrorsField, TextField} from "uniforms-antd";
import {bridge as schema} from './ResetPasswordFormSchema';
import {Button} from "antd";
import styles from "./style.module.css"

export function ResetPasswordForm() {
    function onSubmit(){

    }

    return <AutoForm schema={schema} onSubmit={onSubmit}>
        <TextField name='password' type='password'/>
        <TextField name='repeatPassword' type='password'/>
        <ErrorsField/>
        <div>
            <Button className={styles.resetPasswordButton} type="primary" htmlType="submit">
                Reset password
            </Button>
        </div>
    </AutoForm>

}