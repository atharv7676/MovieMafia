import api from "./api.js";

export const addToWishList = async (movieId) => {
    const response = await api.post(`/wishlist/${movieId}`);

    return response.data;
};

export const removeFromWishlist = async (movieId)=>{
    const response = await api.delete(`/wishlist/${movieId}`);

    return response.data;
}
export const getWishList = async ()=>{
    const response = await api.get(`/wishlist`);

    return response.data;
}