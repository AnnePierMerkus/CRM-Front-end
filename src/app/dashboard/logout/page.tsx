'use client';

import { removeToken } from "@/services/ApiService";

export default function Page() {
    removeToken();
    // if (typeof window !== "undefined" && typeof window.location !== "undefined") {
    //     window.location.href = '/auth/login'
    // }
    return null; 
}