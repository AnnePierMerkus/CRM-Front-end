'use client';

import React from 'react';
import {AutoFields, AutoForm, ErrorsField, SubmitField, TextField} from "uniforms-antd";
import {bridge as schema, LoginFormType} from './LoginFormSchema';
import {login} from "@/services/authentication/AuthenticationService";
import {Button, Form, Input, message} from "antd";
import {saveToken} from "@/services/ApiService";
import {useRouter} from 'next/navigation';
import styles from "./style.module.css"

export function LoginForm() {
    const router = useRouter();

    const success = () => {
        router.push('/dashboard');
    }
    const error = ({response}: { response: { data: { message: string } } }) => {
        message.error(response.data.message)
    }

    const onSubmit = (data: LoginFormType) => {
        login(data)
            // @ts-ignore
            .then(response => {
                saveToken(response.data.token)
                success()
            })
            .catch(error)
    }

    return <AutoForm schema={schema} onSubmit={onSubmit}>
        <TextField name='email'/>
        <TextField name='password' type='password'/>
        <ErrorsField/>
        <div>
            <Button className={styles.loginButton} type="primary" htmlType="submit">
                Login
            </Button>
        </div>
        <a href="/auth/password-forgotten">Forgot Password?</a>
    </AutoForm>

}