import axios from "axios"
//import * as dotnev from 'dotenv';

const api = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_URL,
    timeout: 1500,
});


export default api;