import jwtDecode from "jwt-decode";

export function decode(token: string): string | void {
    if (!token) return
    return jwtDecode(token)
}