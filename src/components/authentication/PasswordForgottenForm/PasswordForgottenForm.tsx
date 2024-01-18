'use client';

import React from 'react';
import {AutoForm, ErrorsField, TextField} from "uniforms-antd";
import {bridge as schema} from './PasswordForgottenFormSchema';
import {Button, message} from "antd";
import styles from "./style.module.css"
import { forgotPassword } from '@/services/authentication/AuthenticationService';

export function PasswordForgottenForm() {

    const error = ({response}: { response: { data: { message: string } } }) => {
        message.error(response.data.message)
    }

    function onSubmit(data: {email: string}){
        forgotPassword(data).then(response => {
            message.success("Password reset email sent")
            window.location.href = '/auth/login';
        }).catch(error)
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