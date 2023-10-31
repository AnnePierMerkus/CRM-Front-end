'use client';

import React from 'react';
import {AutoForm} from "uniforms-antd";
import {bridge as schema, LoginFormType} from './LoginFormSchema';
import {login} from "@/services/authentication/AuthenticationService";
import {message} from "antd";
import {saveToken} from "@/services/ApiService";

export function LoginForm() {

    const success = () => {

    }
    const error = ({response}: {response: {data: { message:string }}}) => {
        message.error(response.data.message)
    }

    const onSubmit = (data: LoginFormType) => {
        login(data)
            // @ts-ignore
            .then(response => {
                saveToken(response.data.token)
            })
            .catch(error)
    }

    return <AutoForm schema={schema} onSubmit={onSubmit}/>
}