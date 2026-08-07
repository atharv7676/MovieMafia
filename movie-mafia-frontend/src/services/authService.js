import api from "./api.js";

export const login = async (credentials)=>{

    const response = await api.post("/users/login", credentials);

    return response.data
}

export const register = async (credentials) =>{
    const response = await api.post("/users/register", credentials)

    return response.data
}

export const logout = async()=>{
    const response = await api.post("/users/logout")

    return response.data
}

export const getCurrentUser = async()=>{
    const response = await api.get("/users/me")

    return response.data
}

export const refreshAccessToken = async ()=>{
    const response = await api.post("/users/refresh-token")

    return response.data
}