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



export default function CadastroUser({navigation} : {navigation: NavigationProps}) {
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
                    Crie sua conta e comece sua evolução
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

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0F172A",
        justifyContent: "center",
        padding: 20,
    },

    card: {
        backgroundColor: "#1E293B",
        borderRadius: 20,
        padding: 24,
    },

    logo: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#22C55E",
        textAlign: "center",
        marginBottom: 10,
    },

    subtitle: {
        color: "#CBD5E1",
        textAlign: "center",
        marginBottom: 30,
    },

    input: {
        backgroundColor: "#334155",
        color: "#FFF",
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 55,
        marginTop: 12,
    },

    error: {
        color: "#EF4444",
        marginTop: 4,
        marginLeft: 4,
    },

    button: {
        marginTop: 24,
        height: 55,
        borderRadius: 12,
        backgroundColor: "#22C55E",
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16,
    },
});