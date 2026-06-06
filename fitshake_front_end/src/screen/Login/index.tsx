import { useAuthProvider } from '@/src/context/AuthProvider';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../types/navigation.types";

type NavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    "Login"
>;



export default function Login({navigation}: {navigation: NavigationProps}) {
    const { control, handleSubmit } = useForm();
    const { login } = useAuthProvider();
    
    async function submit(data: any) {
        try {
            await login(data);
            console.warn(data);
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <View style={{ display: "flex", justifyContent: "center", padding: 20, paddingTop: 200 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'auto', alignContent: "center" }}>Login</Text>

            <Controller
                control={control}
                name='login'
                rules={{
                    required: "Campo obrigatório"
                }}
                render={({ field, fieldState }) => (
                    <View style={{ width: "100%" }}>
                        <Text>Login</Text>
                        <TextInput value={field.value} onChangeText={field.onChange} style={{ borderColor: 'black', borderWidth: 2, borderRadius: 10 }} />

                        {fieldState.error && (
                            <View>
                                <Text style={{ color: 'red' }}>{fieldState?.error?.message}</Text>
                            </View>
                        )}
                    </View>
                )}
            />

            <Controller
                control={control}
                name='senha'
                rules={{
                    required: "Campo obrigatório"
                }}
                render={({ field, fieldState }) => (
                    <View style={{ width: "100%" }}>
                        <Text>Senha</Text>
                        <TextInput value={field.value} onChangeText={field.onChange} style={{ borderColor: 'black', borderWidth: 2, borderRadius: 10 }} />

                        {fieldState.error && (
                            <View>
                                <Text style={{ color: 'red' }}>{fieldState?.error?.message}</Text>
                            </View>
                        )}
                    </View>
                )}
            />


            <View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit(submit)}>
                    <Text style={{ color: "white" }}>Logar</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={{ alignItems: 'center', paddingTop: 10 }} onPress={() => navigation.navigate("CadastroUser")}>
                    <Text style={{ color: "black" }}>Registrar-se</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        backgroundColor: '#1a3dba',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        height: 50,
        width: 171,
        alignSelf: 'center',
    }
})