import api from "../api/axios";

export interface LoginPayload {
    username: string;
    password: string;
}

export interface SignupPayload {
    username: string;
    email: string;
    password: string;
}

export const login = async (data: LoginPayload) => {
    const res = await api.post("/api/auth/login", data);
    return res.data;
};

export const signup = async (data: SignupPayload) => {
    const res = await api.post("/api/auth/signup", data);
    return res.data;
};
