'use client';

import { removeToken } from "@/services/ApiService";

export default function Page() {
    removeToken();
    window.location.href = '/auth/login'
    return null; 
}