export const TOKEN_KEY = process.env.TOKEN_ID || '';
export const TOKEN_KEY_LOCAL = '@' + process.env.TOKEN_ID || '';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY_LOCAL) !== null || sessionStorage.getItem(TOKEN_KEY) !== null

export const getToken = () => {
    if (localStorage.getItem(TOKEN_KEY_LOCAL) !== null)
        return localStorage.getItem(TOKEN_KEY_LOCAL) !== null
    else
        return sessionStorage.getItem(TOKEN_KEY) !== null
}

export const login = (token: string, checked: boolean) => {

    checked
        ? localStorage.setItem(TOKEN_KEY_LOCAL, token)
        : sessionStorage.setItem(TOKEN_KEY, token)
};

export const logout = () => {

    if (localStorage.getItem(TOKEN_KEY_LOCAL) !== null) {
        localStorage.removeItem(TOKEN_KEY_LOCAL)
    }
    else {
        sessionStorage.removeItem(TOKEN_KEY)
    }
};