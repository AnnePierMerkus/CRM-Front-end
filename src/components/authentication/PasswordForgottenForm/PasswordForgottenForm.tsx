'use client';

import React from 'react';
import {AutoForm, ErrorsField, TextField} from "uniforms-antd";
import {bridge as schema} from './PasswordForgottenFormSchema';
import {Button} from "antd";
import styles from "./style.module.css"

export function PasswordForgottenForm() {
    function onSubmit(){

    }

    return <AutoForm schema={schema} onSubmit={onSubmit}>
        <TextField name='email'/>
        <ErrorsField/>
        <div>
            <Button className={styles.passwordForgetButton} type="primary" htmlType="submit">
                Send e-mail
            </Button>
        </div>
    </AutoForm>

}