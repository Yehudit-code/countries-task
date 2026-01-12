import api from "./axios";

export const getMyProfile = async () => {
    const res = await api.get("/users/me");
    return res.data;
};

export const updateMyProfile = async (formData: FormData) => {
    const res = await api.put("/users/me", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};
