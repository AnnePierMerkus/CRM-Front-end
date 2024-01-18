'use client';

import axios from "axios";
import {API_URL, TOKEN} from "@/services/ApiService";

export function login(data: { email: string, password: string }) {
    return axios.post(API_URL + "/auth/login", data)
}

export function init() {
    return axios.get(API_URL + "/auth/profile", {headers: {'Authorization': 'Bearer ' + TOKEN}})
}

export function forgotPassword(data: { email: string }) {
    return axios.post(API_URL + "/auth/forgotpassword", data)
}

export function resetPassword(data: { token: string, password: string }) {
    return axios.post(API_URL + "/auth/resetpassword", {
        newPasswordToken: data.token,
        newPassword: data.password
    })
}