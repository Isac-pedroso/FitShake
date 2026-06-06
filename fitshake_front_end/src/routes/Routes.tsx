import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthProvider } from "../context/AuthProvider";
import Login from "../screen/Login/index";
import CadastroUser from "../screen/cadastroUser";

import { RootStackParamList } from "../types/navigation.types";

import { AdminNavigator } from "./AdminNavigator";
import { UserNavigator } from "./UserNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {

    const { isAuthenticated, userInfo } = useAuthProvider();



    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                {!isAuthenticated ? (
                    <>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="CadastroUser" component={CadastroUser} />
                    </>
                ) : String(userInfo?.role).toLocaleLowerCase().trim() === "admin" ? (
                    <Stack.Screen name="AdminNavigator" component={AdminNavigator} />
                ) : (
                    <Stack.Screen name="UserNavigator" component={UserNavigator} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}