import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TabsAdmin } from "./TabsAdmin";

import ExerciciosCadastro from "../screen/admin/ExerciciosAdmin/ExercicioCadastro";
import CadExercicioCalibracao from "../screen/admin/ExerciciosAdmin/ExercicioCadastro/CadExercicioCalibracao";
import CadExercicioEtapa1 from "../screen/admin/ExerciciosAdmin/ExercicioCadastro/CadExercicioEtapa1";
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

            <Stack.Screen
                name="CadExercicioEtapa1"
                component={CadExercicioEtapa1}
            />

            <Stack.Screen
                name="CadExercicioCalibracao"
                component={CadExercicioCalibracao}
            />

            {/* <Stack.Screen
                name="ExercicioDetalhes"
                component={ExerciciosDetalhes}
            /> */}
        </Stack.Navigator>
    );
}