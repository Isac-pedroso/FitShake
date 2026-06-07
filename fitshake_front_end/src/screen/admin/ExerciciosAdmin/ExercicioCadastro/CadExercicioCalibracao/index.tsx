import Header from "@/src/components/Header";
import { useLoading } from "@/src/context/LoadingProvider";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { Accelerometer } from "expo-sensors";
import { useEffect, useRef, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function CadExercicioCalibracao() {

    const navigation = useNavigation<any>();

    const [dadosStorage, setDadosStorage] = useState<any>(null);
    const [limitMin, setLimitMin] = useState<number>(0);
    const [limitMax, setLimitMax] = useState<number>(0);

    const [calibracaoExecutada, setCalibracaoExecutada] = useState<boolean>(false);
    const [isTestando, setIsTestando] = useState<boolean>(false);

    const executouDescidaRef = useRef(false);
    const [isStart, setIsStart] = useState<boolean>(false);

    const [qtdExecucoes, setQtdExecucoes] = useState<number>(0);
    const {
        showLoading,
        hideLoading,
        setIsError,
        setIsSuccess,
        setMsgLoading,
    } = useLoading();


    useEffect(() => {
        async function getDadosStorage() {
            let hasError = false;
            try {
                showLoading("Carregando...");

                await new Promise(resolve => setTimeout(resolve, 100));

                const dadosCacheStorage = await AsyncStorage.getItem("dadosCadExercicioTEMP");

                if (!dadosCacheStorage) {
                    throw "Preencha os campos de cadastro.";
                }

                setDadosStorage(JSON.parse(dadosCacheStorage));

            } catch (error: any) {
                hasError = true;

                setIsError();
                setMsgLoading(
                    error ||
                    "Erro ao cadastrar exercício."
                );
            } finally {
                setTimeout(() => {
                    hideLoading();
                }, hasError ? 1600 : 800);

                if (hasError) {
                    setTimeout(() => {
                        navigation.navigate("ExercicioCadastro");
                    }, 1600)
                }
            }
        }

        getDadosStorage();
    }, [])



    async function iniciarCalibracao() {
        setLimitMin(999);
        setLimitMax(-999);
        setCalibracaoExecutada(false);
        setIsTestando(false);
        setQtdExecucoes(0);
        executouDescidaRef.current = false;
        setIsStart(true);
    }


    async function finalizarCalibracao() {
        setIsStart(false);
        setCalibracaoExecutada(true);
    }


    function iniciarTeste() {
        setQtdExecucoes(0);
        executouDescidaRef.current = false;
        setIsTestando(true);
        setIsStart(true);
    }

    function pararTeste() {
        setIsTestando(false);
        setIsStart(false);
        executouDescidaRef.current = false;
    }

    useEffect(() => {
        let subscription: any;

        if (isStart) {

            Accelerometer.setUpdateInterval(100);

            subscription = Accelerometer.addListener(({ x, y, z }) => {

                const valorAtual = y;

                if (isTestando) {
                    if (valorAtual >= limitMax && !executouDescidaRef.current) {
                        executouDescidaRef.current = true;
                    }

                    if (executouDescidaRef.current && valorAtual <= limitMin) {
                        setQtdExecucoes((old) => old + 1);
                        executouDescidaRef.current = false;
                    }

                    return;
                }

                setLimitMin((old) => valorAtual < old ? valorAtual : old);
                setLimitMax((old) => valorAtual > old ? valorAtual : old);
            });
        }

        return () => {
            subscription?.remove();
        };
    }, [isStart, isTestando, limitMin, limitMax]);



    async function handleConcluirCalibracao() {
        let hasError = false;
        try {
            showLoading("Validando campos...");
            console.log("AQUIIII")
            await new Promise(resolve => setTimeout(resolve, 100));

            if (!calibracaoExecutada) {
                throw "Efetue a calibração antes de concluir.";
            }

            await new Promise(resolve => setTimeout(resolve, 150));
            setMsgLoading("Salvando informações...");

            dadosStorage.dados = {
                ...dadosStorage.dados,
                limiteMin: limitMin,
                limiteMax: limitMax,
            }

            dadosStorage.calibracao = true;

            await AsyncStorage.setItem("dadosCadExercicioTEMP", JSON.stringify(dadosStorage));

            setIsSuccess();
            setMsgLoading("Calibração concluída!");


            await new Promise(resolve => setTimeout(resolve, 150));
            setMsgLoading("Redirecionando...");

            navigation.navigate("ExercicioCadastro");
        } catch (error: any) {
            hasError = true;

            setIsError();
            setMsgLoading(
                error ||
                "Erro ao conlcuir calibração exercício."
            );
        } finally {
            setTimeout(() => {
                hideLoading();
            }, hasError ? 1600 : 800);
        }
    }
    return (
        <View style={styles.container}>
            <Header title="Posicionamento celular" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <View style={styles.card}>
                    <View style={styles.row}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                Limite mínimo
                            </Text>

                            <TextInput
                                keyboardType="numeric"
                                style={styles.input}
                                value={String(
                                    limitMin
                                )}
                                onChangeText={(text) =>
                                    setLimitMin(Number(text))
                                }
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                Limite máximo
                            </Text>

                            <TextInput
                                keyboardType="numeric"
                                style={styles.input}
                                value={String(
                                    limitMax
                                )}
                                onChangeText={(text) =>
                                    setLimitMax(Number(text))
                                }
                            />
                        </View>

                    </View>
                </View>


                <View style={styles.executionCard}>
                    <Text style={styles.executionTitle}>
                        Execução Atual
                    </Text>

                    <Text style={styles.executionCounter}>
                        {qtdExecucoes}
                    </Text>

                    <Text style={styles.executionLabel}>
                        repetições realizadas
                    </Text>

                    <Text style={styles.subtitle}>
                        Efetue 10 repetições
                    </Text>
                </View>


                {isTestando ? (

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.button, isStart ? styles.buttonStop : styles.buttonStart]}
                        onPress={pararTeste}
                    >
                        <Ionicons
                            name={isStart ? "stop" : "play"}
                            size={24}
                            color="#FFF"
                        />
                        <Text style={styles.startButtonText}>
                            Parar Teste
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.button, isStart ? styles.buttonStop : styles.buttonStart]}
                        onPress={() => isStart ? finalizarCalibracao() : iniciarCalibracao()}
                    >
                        <Ionicons
                            name={isStart ? "stop" : "play"}
                            size={24}
                            color="#FFF"
                        />
                        <Text style={styles.startButtonText}>
                            {isStart ? 'Finalizar Calibração' : 'Iniciar Calibração'}
                        </Text>
                    </TouchableOpacity>
                )}


                {(calibracaoExecutada && !isTestando) && (

                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={iniciarTeste}
                    >
                        <Text style={styles.buttonText}>
                            Testar
                        </Text>
                    </TouchableOpacity>
                )}

                {calibracaoExecutada && (

                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={handleConcluirCalibracao}
                    >
                        <Text style={styles.buttonText}>
                            Concluir calibração
                        </Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0E1117",
    },

    content: {
        padding: 20,
        paddingBottom: 40,
    },

    card: {
        backgroundColor: "#1B2330",
        borderRadius: 20,
        padding: 20,
    },

    label: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 8,
        marginTop: 16,
    },

    input: {
        backgroundColor: "#121821",
        borderRadius: 14,
        paddingHorizontal: 16,
        height: 54,
        color: "#FFF",
        borderWidth: 1,
        borderColor: "#263244",
    },

    textArea: {
        height: 120,
        paddingTop: 15,
    },


    subtitle: {
        color: "#94A3B8",
        marginTop: 8,
        lineHeight: 20,
    },

    row: {
        flexDirection: "row",
        gap: 12,
    },

    inputGroup: {
        flex: 1,
    },

    switchCard: {
        marginTop: 24,
        backgroundColor: "#121821",
        borderRadius: 16,
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    switchTitle: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
    },

    switchSubtitle: {
        color: "#94A3B8",
        marginTop: 4,
        maxWidth: 220,
    },

    button: {
        marginTop: 24,
        backgroundColor: "#FF7A00",
        height: 58,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
    },

    buttonText: {
        color: "#FFF",
        fontWeight: "700",
        fontSize: 16,
    },

    executionCard: {
        backgroundColor: "#1B2330",
        borderRadius: 22,
        paddingVertical: 30,
        marginTop: 18,
        alignItems: "center",
    },

    executionTitle: {
        color: "#94A3B8",
        fontSize: 15,
    },

    executionCounter: {
        color: "#22C55E",
        fontSize: 64,
        fontWeight: "800",
        marginVertical: 10,
    },

    executionLabel: {
        color: "#FFF",
        fontSize: 15,
    },

    startButtonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "700",
    },
    buttonStart: {
        backgroundColor: "#22C55E",
    },

    buttonStop: {
        backgroundColor: "#EF4444",
    },
});