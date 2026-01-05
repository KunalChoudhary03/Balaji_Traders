import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://balaji-traders-8f7n.onrender.com/api";

const API = axios.create({ baseURL: API_BASE_URL });

// Categories
export const getCategories = () => API.get("/category/all");
export const createCategory = (data) => API.post("/category/create", data);

// Products
export const getProducts = () => API.get("/product/all");
export const createProduct = (data) => API.post("/product/create", data);
export const togglePrice = (productId) => API.patch(`/product/price-toggle/${productId}`);
export const getProductsByCategory = (categoryId) => API.get(`/product/category/${categoryId}`);