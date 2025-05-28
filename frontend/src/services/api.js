import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Automatically attach the token to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Retrieve token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
   console.log("Attaching Token to Request:", token);
    } else {
      console.warn("No token found in localStorage!");
    }

  return config;
}, (error) => {
  console.error("Axios Request Interceptor Error:", error);

  return Promise.reject(error);
 

});

// API functions
export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);
export const getTodos = () => API.get("/todos"); // No need to pass token manually!
export const addTodo = (todoData) => API.post("/todos", todoData);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);
export const updateTodo = (id, data) => API.put(`/todos/${id}`, data);
export const updateUser = (userData) => API.put("/auth/update", userData);