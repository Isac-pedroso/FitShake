import Header from "@/src/components/Header";
import { useLoading } from "@/src/context/LoadingProvider";
import { useExercicio } from "@/src/features/exercicio/exercicio.hooks";
import { ExercicioRequest } from "@/src/features/exercicio/exercicio.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useCallback, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";


export default function ExercicioCadastro() {
    const navigation = useNavigation<any>();
    const { cadastrarExercicio } = useExercicio();
    const [calibrarAutomaticamente, setCalibrarAutomaticamente] = useState<boolean>(true);
    const [posicionamentoConcluido, setPosicionamentoConcluido] = useState<boolean>(false);
    const [calibracaoConcluido, setCalibracaoConcluido] = useState<boolean>(false);

    const {
        showLoading,
        hideLoading,
        setIsError,
        setIsSuccess,
        setMsgLoading,
    } = useLoading();

    const [dados, setDados] = useState<ExercicioRequest>({
        nome: "",
        descricao: "",
        limiteMin: 0,
        limiteMax: 0,
        usaGiroscopio: false,
        posicionamentoCelular: "",
        descricaoPosicionamento: "",
        fotosPosicionamento: []
    });

    async function proximaEtapa() {
        let hasError = false;
        try {
            showLoading("Validando campos...");

            await new Promise(resolve => setTimeout(resolve, 100));

            await validarCamposCad();


            await new Promise(resolve => setTimeout(resolve, 100));


            const payload = {
                dados: dados,
                posicionamento: false,
                calibracao: false,
                calibrarAutomaticamente: calibrarAutomaticamente,
            }

            await AsyncStorage.setItem("dadosCadExercicioTEMP", JSON.stringify(payload))

            setMsgLoading("Redirecionando...");

            return navigation.navigate("CadExercicioEtapa1");

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
        }
    }


    async function etapaCalibrar() {
        let hasError = false;
        try {
            showLoading("Validando campos...");

            await new Promise(resolve => setTimeout(resolve, 100));

            await validarCamposCad();


            await new Promise(resolve => setTimeout(resolve, 100));
            
            setMsgLoading("Redirecionando...");

            return navigation.navigate("CadExercicioCalibracao");

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
        }
    }




    async function validarCamposCad() {
        if (!dados.nome.trim()) {
            throw "Informe o nome do exercício.";
        }

        if (!dados.descricao.trim()) {
            throw "Informe a descrição.";
        }
    }


    async function salvar() {
        let hasError = false;

        try {

            await new Promise(resolve => setTimeout(resolve, 200));
            showLoading("Validando campos...");

            await validarCamposCad();

            await new Promise(resolve => setTimeout(resolve, 100));
            setMsgLoading('Salvando exercício...');

            await cadastrarExercicio(dados);

            setIsSuccess();
            setMsgLoading("Exercício cadastrado com sucesso!");

            setDados({
                nome: "",
                descricao: "",
                limiteMin: 0,
                limiteMax: 0,
                usaGiroscopio: false,
                posicionamentoCelular: "",
                descricaoPosicionamento: "",
                fotosPosicionamento: []
            });
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
        }
    }

    useFocusEffect(
        useCallback(() => {
            async function getDadosStorage() {
                const dadosCacheStorage = await AsyncStorage.getItem("dadosCadExercicioTEMP");
                console.log(dadosCacheStorage)
                if (!dadosCacheStorage) {
                    setDados({
                        nome: "",
                        descricao: "",
                        limiteMin: 0,
                        limiteMax: 0,
                        usaGiroscopio: false,
                        posicionamentoCelular: "",
                        descricaoPosicionamento: "",
                        fotosPosicionamento: []
                    })

                    setPosicionamentoConcluido(false);
                    setCalibrarAutomaticamente(true);
                    setCalibracaoConcluido(false);

                    return;
                }
                const dadosCache = JSON.parse(dadosCacheStorage);

                setPosicionamentoConcluido(dadosCache?.posicionamento);
                setCalibrarAutomaticamente(dadosCache?.calibrarAutomaticamente);
                setCalibracaoConcluido(dadosCache.calibracao)
                setDados(dadosCache?.dados);
            }

            getDadosStorage();
        }, [])
    );



    return (
        <View style={styles.container}>
            <Header title="Novo Exercício" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <View style={styles.card}>
                    <Text style={styles.label}>
                        Nome do exercício
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Ex: Agachamento"
                        placeholderTextColor="#64748B"
                        value={dados.nome}
                        onChangeText={(text) =>
                            setDados({
                                ...dados,
                                nome: text,
                            })
                        }
                    />

                    <Text style={styles.label}>
                        Descrição
                    </Text>

                    <TextInput
                        style={[
                            styles.input,
                            styles.textArea,
                        ]}
                        multiline
                        textAlignVertical="top"
                        placeholder="Descreva como o exercício deve ser executado..."
                        placeholderTextColor="#64748B"
                        value={dados.descricao}
                        onChangeText={(text) =>
                            setDados({
                                ...dados,
                                descricao: text,
                            })
                        }
                    />


                    <View style={styles.switchCard}>
                        <View>
                            <Text style={styles.switchTitle}>
                                Cilibração
                            </Text>

                            <Text style={styles.switchSubtitle}>
                                Calibrar automaticamente o exercicio.
                            </Text>
                        </View>

                        <Switch
                            value={calibrarAutomaticamente}
                            onValueChange={() => setCalibrarAutomaticamente(!calibrarAutomaticamente)}
                            trackColor={{
                                false: "#334155",
                                true: "#22C55E",
                            }}
                        />
                    </View>

                    {!calibrarAutomaticamente && (

                        <View style={styles.row}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>
                                    Limite mínimo
                                </Text>

                                <TextInput
                                    keyboardType="numeric"
                                    style={styles.input}
                                    value={String(
                                        dados.limiteMin
                                    )}
                                    onChangeText={(text) =>
                                        setDados({
                                            ...dados,
                                            limiteMin:
                                                Number(text) || 0,
                                        })
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
                                        dados.limiteMax
                                    )}
                                    onChangeText={(text) =>
                                        setDados({
                                            ...dados,
                                            limiteMax:
                                                Number(text) || 0,
                                        })
                                    }
                                />
                            </View>
                        </View>
                    )}

                    <View style={styles.switchCard}>
                        <View>
                            <Text style={styles.switchTitle}>
                                Utiliza Giroscópio
                            </Text>

                            <Text style={styles.switchSubtitle}>
                                Ative para exercícios que
                                dependem de rotação do
                                aparelho.
                            </Text>
                        </View>

                        <Switch
                            value={dados.usaGiroscopio}
                            onValueChange={(value) =>
                                setDados({
                                    ...dados,
                                    usaGiroscopio: value,
                                })
                            }
                            trackColor={{
                                false: "#334155",
                                true: "#22C55E",
                            }}
                        />
                    </View>
                </View>

                {!posicionamentoConcluido ? (

                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={proximaEtapa}
                    >
                        <Text style={styles.buttonText}>
                            Proxima etápa
                        </Text>
                    </TouchableOpacity>
                ) : (!calibracaoConcluido && calibrarAutomaticamente) ? (
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={etapaCalibrar}
                    >
                        <Text style={styles.buttonText}>
                            Calibrar
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={salvar}
                    >
                        <Text style={styles.buttonText}>
                            Salvar Exercício
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
});