import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExerciciosExecutar from "../screen/user/Exercicios/ExerciciosExecutar";
import { TabsUser } from "./TabsUser";

const Stack = createNativeStackNavigator();

export function UserNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="TabsUser" component={TabsUser} />
            <Stack.Screen name="ExerciciosExecutar" component={ExerciciosExecutar} />
        </Stack.Navigator>
    )
}