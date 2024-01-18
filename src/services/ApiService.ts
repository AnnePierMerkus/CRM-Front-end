const tokenKey = "token";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
export const TOKEN = window != undefined ?window.localStorage.getItem(tokenKey) : "";

export function saveToken(token: string) {
    window.localStorage.setItem(tokenKey, token)
}

export function removeToken() {
    window.localStorage.removeItem(tokenKey)
    window.location.href = '/auth/login'
};


