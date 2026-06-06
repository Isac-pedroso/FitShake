import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screen/Login/index";
import CadastroUser from "../screen/cadastroUser";
import { RootStackParamList } from "../types/navigation.types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {




    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="CadastroUser" component={CadastroUser} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}