import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TabsAdmin } from "./TabsAdmin";

import ExerciciosCadastro from "../screen/admin/ExerciciosAdmin/ExercicioCadastro";
// import ExerciciosDetalhes from "../screen/admin/ExerciciosAdmin/ExercicioDetalhes";

const Stack = createNativeStackNavigator();

export function AdminNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="TabsAdmin"
                component={TabsAdmin}
            />

            <Stack.Screen
                name="ExercicioCadastro"
                component={ExerciciosCadastro}
            />

            {/* <Stack.Screen
                name="ExercicioDetalhes"
                component={ExerciciosDetalhes}
            /> */}
        </Stack.Navigator>
    );
}