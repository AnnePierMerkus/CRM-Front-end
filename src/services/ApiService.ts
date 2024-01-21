const tokenKey = "token";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
export const TOKEN = typeof window !== "undefined" ?window.localStorage.getItem(tokenKey) : "";

export function saveToken(token: string) {
    if (typeof window !== "undefined") {
        window.localStorage.setItem(tokenKey, token)
    }
}

export function removeToken() {
    if (typeof window !== "undefined") {
        window.localStorage.removeItem(tokenKey)
        if (typeof window !== "undefined") {
            window.location.href = '/auth/login'
        }
    }
};


