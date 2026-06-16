import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const URL_API = process.env.EXPO_PUBLIC_URL_API;
console.log(URL_API)
const api = axios.create({
    baseURL: URL_API,
});

api.interceptors.response.use(
    response => response,
    async error => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            window.location.href = "/Login";
            await AsyncStorage.removeItem("isAuthenticated");
            await AsyncStorage.removeItem("userInfo");
        }
    })

export default api;