import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthProvider } from "../context/AuthProvider";
import Login from "../screen/Login/index";
import CadastroUser from "../screen/cadastroUser";

import { RootStackParamList } from "../types/navigation.types";

import { TabsAdmin } from "./TabsAdmin";
import { TabsUser } from "./TabsUser";

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
                    <Stack.Screen name="TabsAdmin" component={TabsAdmin} />
                ) : (
                    <Stack.Screen name="TabsUser" component={TabsUser} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}