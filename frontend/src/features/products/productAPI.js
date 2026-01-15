import axios from "axios";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const API_URL = "http://localhost:5000/api/products";

/* export const fetchProductsAPI = async ({ page, keyword, category }) => {
  const res = await axios.get(
    `${API_URL}?page=${page}&keyword=${keyword}&category=${category}`
  );
  return res.data;
}; */

export const fetchProductsAPI = async () => {
  const res = await axios.get(`${API_URL}`);
  return res.data;
};

export const createProductAPI = (product) =>
  axios.post(API_URL, product, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateProductAPI = ({ id, product }) =>
  axios.put(`${API_URL}/${id}`, product, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteProductAPI = (id) => axios.delete(`${API_URL}/${id}`);
