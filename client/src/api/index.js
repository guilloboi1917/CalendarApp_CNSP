import axios from "axios";
const API = axios.create({ baseURL: "http://127.0.0.1:80"})

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchTasks = (userId) => API.get(`/tasks/${userId}`);
export const createTask = (userId, newTask) => API.post(`/tasks/${userId}`, newTask);
export const updateTask = (userId, taskId, updatedTask) => API.patch(`/tasks/${userId}/${taskId}`, updatedTask);
export const deleteTask = (userId, taskId) => API.delete(`/tasks/${userId}/${taskId}`);
export const shareTask = (userId, taskId, sharedEmail) => API.patch(`/tasks/${userId}/${taskId}/share`, sharedEmail)
export const unshareTask = (userId, taskId, sharedEmail) => API.patch(`/tasks/${userId}/${taskId}/unshare`, sharedEmail)

export const updateUser = (userId, updatedUserData) => API.patch(`/users/update/${userId}`, updatedUserData)

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);