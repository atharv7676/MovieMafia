import api from "./api";

export const getAdminStats = async ()=>{
    const response = await api.get("/users/admin/stats");

    return response.data;
}