import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://balaji-traders-8f7n.onrender.com/api";

const API = axios.create({ baseURL: API_BASE_URL });

// Categories
export const getCategories = () => API.get("/category/all");
export const createCategory = (data) => API.post("/category/create", data);

// Products
export const getProducts = () => API.get("/product/all");
export const createProduct = (data) => API.post("/product/create", data);
export const updateProduct = (id, data) => API.put(`/product/update/${id}`, data);
export const deleteProduct = (id) => API.delete(`/product/delete/${id}`);
export const toggleAllPrices = () => API.patch("/product/toggle-all-prices");
export const toggleProductPrices = (id) => API.patch(`/product/toggle-prices/${id}`);
