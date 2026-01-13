import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

export const fetchProductsAPI = () => axios.get(API_URL);

export const createProductAPI = (product) =>
  axios.post(API_URL, product, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateProductAPI = ({ id, product }) =>
  axios.put(`${API_URL}/${id}`, product, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteProductAPI = (id) => axios.delete(`${API_URL}/${id}`);
