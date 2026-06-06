import { useAuthProvider } from '@/src/context/AuthProvider';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Controller, useForm } from 'react-hook-form';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { RootStackParamList } from "../../types/navigation.types";

type NavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    "Login"
>;

export default function Login({
    navigation,
}: {
    navigation: NavigationProps;
}) {

    const { control, handleSubmit } = useForm();

    const { login } = useAuthProvider();

    async function submit(data: any) {
        try {
            await login(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.card}>

                <Text style={styles.logo}>
                    💪 FITSHAKE
                </Text>

                <Text style={styles.subtitle}>
                    Seu movimento. Sua evolução.
                </Text>

                <Controller
                    control={control}
                    name="login"
                    rules={{
                        required: "Informe seu email",
                    }}
                    render={({ field, fieldState }) => (
                        <>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="#94A3B8"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                value={field.value}
                                onChangeText={field.onChange}
                                style={styles.input}
                            />

                            {fieldState.error && (
                                <Text style={styles.error}>
                                    {fieldState.error.message}
                                </Text>
                            )}
                        </>
                    )}
                />

                <Controller
                    control={control}
                    name="senha"
                    rules={{
                        required: "Informe sua senha",
                    }}
                    render={({ field, fieldState }) => (
                        <>
                            <TextInput
                                placeholder="Senha"
                                placeholderTextColor="#94A3B8"
                                secureTextEntry
                                value={field.value}
                                onChangeText={field.onChange}
                                style={styles.input}
                            />

                            {fieldState.error && (
                                <Text style={styles.error}>
                                    {fieldState.error.message}
                                </Text>
                            )}
                        </>
                    )}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit(submit)}
                >
                    <Text style={styles.buttonText}>
                        ENTRAR
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() =>
                        navigation.navigate("CadastroUser")
                    }
                >
                    <Text style={styles.registerText}>
                        Não possui conta? Cadastre-se
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0B1220",
        justifyContent: "center",
        paddingHorizontal: 24,
    },

    card: {
        backgroundColor: "#182235",
        borderRadius: 28,
        padding: 28,
        borderWidth: 1,
        borderColor: "#243248",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
    },

    logo: {
        fontSize: 34,
        fontWeight: "800",
        color: "#22C55E",
        textAlign: "center",
        marginBottom: 8,
    },

    subtitle: {
        color: "#94A3B8",
        textAlign: "center",
        marginBottom: 30,
        fontSize: 15,
    },

    input: {
        backgroundColor: "#243248",
        borderWidth: 1,
        borderColor: "#334155",
        color: "#F8FAFC",
        borderRadius: 16,
        paddingHorizontal: 18,
        height: 58,
        marginTop: 14,
        fontSize: 15,
    },

    error: {
        color: "#EF4444",
        marginTop: 5,
        marginLeft: 5,
        fontSize: 13,
    },

    button: {
        marginTop: 28,
        height: 58,
        borderRadius: 16,
        backgroundColor: "#22C55E",
        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#22C55E",
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 6,
    },

    buttonText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 16,
        letterSpacing: 0.5,
    },

    registerButton: {
        marginTop: 20,
        alignItems: "center",
    },

    registerText: {
        color: "#94A3B8",
        fontSize: 14,
    },
});