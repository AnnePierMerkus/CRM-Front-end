'use client';

import React from 'react';
import {AutoForm} from "uniforms-antd";
import {bridge as schema, LoginFormType} from './LoginFormSchema';
import {login} from "@/services/authentication/AuthenticationService";
import {message} from "antd";
import {saveToken} from "@/services/ApiService";
import { useRouter } from 'next/navigation';

export function LoginForm() {
    const router = useRouter();

    const success = () => {    
        router.push('/dashboard');
    }
    const error = ({response}: {response: {data: { message:string }}}) => {
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

    return <AutoForm schema={schema} onSubmit={onSubmit}/>
}