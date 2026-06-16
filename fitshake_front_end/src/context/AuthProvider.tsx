import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import { User } from "../features/user/user.type";
import api from "../services/api";

type LoginResponse = {
    result: boolean;
    msg: string;
};

type AuthContextType = {
    isAuthenticated: boolean;
    userInfo: User | null;
    login: (user: User) => Promise<LoginResponse>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState<User | null>(null);

    const URL_API = process.env.EXPO_PUBLIC_URL_API;

    async function login(user: User): Promise<LoginResponse> {
        try {
            const response = await api.post(`/auth/login`, user);
            console.warn(response)
            await AsyncStorage.setItem(
                "isAuthenticated",
                JSON.stringify(true)
            );

            await AsyncStorage.setItem(
                "userInfo",
                JSON.stringify(response?.data)
            );

            setIsAuthenticated(true);
            setUserInfo(response?.data);

            return { result: true, msg: "Logado com sucesso !" };
        } catch (error: any) {
            console.log(error)
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);

            return {
                result: false,
                msg: error.response?.data || "Login ou senha incorreto!"
            };
        }
    }

    async function logout() {
        try {
            await AsyncStorage.removeItem("isAuthenticated");
            await AsyncStorage.removeItem("userInfo");

            setIsAuthenticated(false);
            setUserInfo(null);


        } catch (error) {
            console.log("Erro ao realizar logout:", error);
        }
    }

    async function isLogged() {
        try {
            const isAuthenticatedStorage = await AsyncStorage.getItem(
                "isAuthenticated"
            );

            const authenticated = isAuthenticatedStorage
                ? JSON.parse(isAuthenticatedStorage)
                : false;

            if (!authenticated) {
                await logout();
                return;
            }

            const userInfoStorage = await AsyncStorage.getItem(
                "userInfo"
            );

            const user = userInfoStorage
                ? JSON.parse(userInfoStorage)
                : null;

            if (!user) {
                await logout();
                return;
            }

            setIsAuthenticated(true);
            setUserInfo(user);
        } catch (error) {
            console.log("Erro ao verificar login:", error);
        }
    }

    useEffect(() => {
        isLogged();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                userInfo,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthProvider() {
    return useContext(AuthContext);
}