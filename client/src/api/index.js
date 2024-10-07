import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000"})

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("profile")) {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("profile")).token
//     }`;
//   }

//   return req;
// });

export const fetchTasks = (userId) => API.get(`/tasks/${userId}`);
export const createTask = (userId, newTask) => API.post(`/tasks/${userId}`, newTask);
export const updateTask = (userId, taskId, updatedTask) => API.patch(`/tasks/${userId}/${taskId}`, updatedTask);
export const deleteTask = (userId, taskId) => API.delete(`/tasks/${userId}/${taskId}`);
export const shareTask = (userId, taskId, updatedTask) => API.patch(`/tasks/${userId}/${taskId}`, updatedTask)

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);