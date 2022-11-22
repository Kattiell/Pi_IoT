import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_URL,
    timeout: 1500,
    withCredentials: true,
});




export default api;