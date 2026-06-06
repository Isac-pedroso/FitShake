import { RootStackParamList } from "@/src/types/navigation.types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExercicioCadastro from "./ExercicioCadastro";

const Stack = createNativeStackNavigator<RootStackParamList>();



export default function ExerciciosLayout(){

    return (
        <Stack.Navigator>
            <Stack.Screen name="ExercicioCadastro" component={ExercicioCadastro} />
        </Stack.Navigator>
    )
}