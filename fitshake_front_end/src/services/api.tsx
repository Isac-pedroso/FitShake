import axios from "axios";

const URL_API = process.env.EXPO_PUBLIC_URL_API;

const api = axios.create({
    baseURL: URL_API,
});

export default api;