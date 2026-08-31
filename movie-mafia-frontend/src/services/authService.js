import api from "./api.js";

export const login = async (credentials) => {
  const response = await api.post("/users/login", credentials);

  // Save tokens so api.js can attach them as Authorization headers
  localStorage.setItem("accessToken", response.data.accessToken);
  localStorage.setItem("refreshToken", response.data.refreshToken);

  return response.data;
};

export const register = async (credentials) => {
  const response = await api.post("/users/register", credentials);

  return response.data;
};

export const logout = async () => {
  const response = await api.post("/users/logout");

  // Clear stored tokens on logout
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/users/me");

  return response.data;
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  const response = await api.post("/users/refresh-token", { refreshToken });

  localStorage.setItem("accessToken", response.data.accessToken);
  localStorage.setItem("refreshToken", response.data.refreshToken);

  return response.data;
};