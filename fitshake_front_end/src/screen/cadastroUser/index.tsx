import { Controller, useForm } from "react-hook-form";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLoading } from "../../context/LoadingProvider";
import { useUser } from "../../features/user/user.hooks";
import { userCad } from "../../features/user/user.type";
import { RootStackParamList } from "../../types/navigation.types";


type NavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    "Login"
>;



export default function CadastroUser({ navigation }: { navigation: NavigationProps }) {
    const { cadastrarUsuario } = useUser();

    const {
        showLoading,
        hideLoading,
        setIsError,
        setIsSuccess,
        setMsgLoading,
    } = useLoading();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<userCad>({
        defaultValues: {
            nome: "",
            email: "",
            senha: "",
        },
    });

    async function handleCadastrar(data: userCad) {
        try {
            showLoading("Criando sua conta...");

            await cadastrarUsuario(data);

            setIsSuccess();
            setMsgLoading("Conta criada com sucesso!");

            setTimeout(() => {
                hideLoading();
            }, 1500);

            navigation.navigate("Login");
        } catch (error: any) {
            setIsError();

            setMsgLoading(
                error ||
                "Ocorreu um erro ao criar sua conta."
            );

            setTimeout(() => {
                hideLoading();
            }, 2500);
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.card}>

                <Text style={styles.logo}>
                    FITSHAKE 💪
                </Text>

                <Text style={styles.subtitle}>
                    Transforme movimento em resultados
                </Text>

                <Controller
                    control={control}
                    name="nome"
                    rules={{
                        required: "Informe seu nome",
                    }}
                    render={({ field }) => (
                        <TextInput
                            placeholder="Nome"
                            placeholderTextColor="#94A3B8"
                            value={field.value}
                            onChangeText={field.onChange}
                            style={styles.input}
                        />
                    )}
                />

                {errors.nome && (
                    <Text style={styles.error}>
                        {errors.nome.message}
                    </Text>
                )}

                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: "Informe seu email",
                        pattern: {
                            value:
                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Email inválido",
                        },
                    }}
                    render={({ field }) => (
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#94A3B8"
                            value={field.value}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={field.onChange}
                            style={styles.input}
                        />
                    )}
                />

                {errors.email && (
                    <Text style={styles.error}>
                        {errors.email.message}
                    </Text>
                )}

                <Controller
                    control={control}
                    name="senha"
                    rules={{
                        required: "Informe sua senha",
                        minLength: {
                            value: 6,
                            message:
                                "A senha deve possuir ao menos 6 caracteres",
                        },
                    }}
                    render={({ field }) => (
                        <TextInput
                            placeholder="Senha"
                            placeholderTextColor="#94A3B8"
                            secureTextEntry
                            value={field.value}
                            onChangeText={field.onChange}
                            style={styles.input}
                        />
                    )}
                />

                {errors.senha && (
                    <Text style={styles.error}>
                        {errors.senha.message}
                    </Text>
                )}

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit(
                        handleCadastrar
                    )}
                >
                    <Text style={styles.buttonText}>
                        CADASTRAR
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() =>
                        navigation.navigate("Login")
                    }
                >
                    <Text style={styles.registerText}>
                        Fazer login
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
        letterSpacing: 1,
    },

    subtitle: {
        color: "#94A3B8",
        textAlign: "center",
        fontSize: 15,
        marginBottom: 30,
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