import Header from "@/src/components/Header";
import { useLoading } from "@/src/context/LoadingProvider";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function CadExercicioEtapa1() {

    const navigation = useNavigation<any>();
    const [posicionamentoCelular, setPosicionamentoCelular] = useState("");
    const [descricaoPosicionamento, setDescricaoPosicionamento] = useState("");
    const [fotosPosicionamento, setFotosPosicionamento] = useState<string[]>([]);

    const [dadosStorage, setDadosStorage] = useState<any>(null);

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

    async function concluir() {
        let hasError = false;
        try {
            showLoading("Validando campos...");

            await new Promise(resolve => setTimeout(resolve, 100));

            if (!posicionamentoCelular.trim()) {
                throw "Informe onde o celular deve ser posicionado.";
            }

            if (!descricaoPosicionamento.trim()) {
                throw "Informe a descrição do posicionamento.";
            }

            await new Promise(resolve => setTimeout(resolve, 150));
            setMsgLoading("Salvando informações...");

            dadosStorage.dados.posicionamentoCelular = posicionamentoCelular;
            dadosStorage.dados.descricaoPosicionamento = descricaoPosicionamento;
            dadosStorage.dados.fotosPosicionamento = fotosPosicionamento;
            dadosStorage.posicionamento = true;

            await AsyncStorage.setItem("dadosCadExercicioTEMP", JSON.stringify(dadosStorage));

            setIsSuccess();
            setMsgLoading("Posicionamento concluído!");

            
            await new Promise(resolve => setTimeout(resolve, 150));
            setMsgLoading("Redirecionando...");

            if(dadosStorage.calibrarAutomaticamente){
                navigation.navigate("CadExercicioCalibracao");
                return;
            }

            navigation.navigate("ExercicioCadastro");
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

    function adicionarFotoFake() {
        setFotosPosicionamento([
            ...fotosPosicionamento,
            "https://via.placeholder.com/300x300.png?text=Foto"
        ]);
    }

    return (
        <View style={styles.container}>
            <Header title="Posicionamento celular" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <View style={styles.card}>
                    <Text style={styles.title}>
                        Onde o celular ficará?
                    </Text>

                    <Text style={styles.subtitle}>
                        Informe o local correto para posicionar o aparelho durante o exercício.
                    </Text>

                    <Text style={styles.label}>
                        Posicionamento do celular
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Ex: preso no braço, bolso, cintura..."
                        placeholderTextColor="#64748B"
                        value={posicionamentoCelular}
                        onChangeText={setPosicionamentoCelular}
                    />

                    <Text style={styles.label}>
                        Descrição do posicionamento
                    </Text>

                    <TextInput
                        style={[styles.input, styles.textArea]}
                        multiline
                        textAlignVertical="top"
                        placeholder="Descreva como o usuário deve posicionar o celular..."
                        placeholderTextColor="#64748B"
                        value={descricaoPosicionamento}
                        onChangeText={setDescricaoPosicionamento}
                    />

                    <Text style={styles.label}>
                        Fotos do posicionamento
                    </Text>

                    <TouchableOpacity
                        style={styles.uploadBox}
                        activeOpacity={0.8}
                        onPress={adicionarFotoFake}
                    >
                        <Ionicons
                            name="camera-outline"
                            size={32}
                            color="#FF7A00"
                        />

                        <Text style={styles.uploadText}>
                            Adicionar foto
                        </Text>
                    </TouchableOpacity>

                    {fotosPosicionamento.length > 0 && (
                        <View style={styles.photosContainer}>
                            {fotosPosicionamento.map((foto, index) => (
                                <View
                                    key={index}
                                    style={styles.photoBox}
                                >
                                    <Image
                                        source={{ uri: foto }}
                                        style={styles.photo}
                                    />

                                    <TouchableOpacity
                                        style={styles.removePhoto}
                                        onPress={() =>
                                            setFotosPosicionamento(
                                                fotosPosicionamento.filter(
                                                    (_, i) => i !== index
                                                )
                                            )
                                        }
                                    >
                                        <Ionicons
                                            name="close"
                                            size={16}
                                            color="#FFF"
                                        />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={concluir}
                >
                    <Text style={styles.buttonText}>
                        Concluir posicionamento
                    </Text>
                </TouchableOpacity>
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

    title: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "700",
    },

    subtitle: {
        color: "#94A3B8",
        marginTop: 8,
        lineHeight: 20,
    },

    label: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 8,
        marginTop: 20,
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

    uploadBox: {
        height: 120,
        borderRadius: 16,
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "#FF7A00",
        backgroundColor: "#121821",
        justifyContent: "center",
        alignItems: "center",
    },

    uploadText: {
        color: "#FF7A00",
        fontWeight: "700",
        marginTop: 8,
    },

    photosContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        marginTop: 16,
    },

    photoBox: {
        width: 90,
        height: 90,
        borderRadius: 14,
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#121821",
    },

    photo: {
        width: "100%",
        height: "100%",
    },

    removePhoto: {
        position: "absolute",
        top: 6,
        right: 6,
        backgroundColor: "#EF4444",
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
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