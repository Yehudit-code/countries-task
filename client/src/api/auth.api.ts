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

export const login = async (data: {
    username: string;
    password: string;
}) => {
    const res = await api.post("/auth/login", data);
    return res.data;
};

export const signup = async (data: FormData) => {
    const res = await api.post("/auth/signup", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data;
};

export const getMe = async () => {
    const res = await api.get("/auth/me");
    return res.data;
};
