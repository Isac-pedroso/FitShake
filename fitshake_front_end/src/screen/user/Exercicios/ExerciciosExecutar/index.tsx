import Header from "@/src/components/Header";
import { useExercicio } from "@/src/features/exercicio/exercicio.hooks";
import { RootStackParamList } from "@/src/types/navigation.types";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
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

type Props = {
    route: RouteProp<
        RootStackParamList,
        "ExerciciosExecutar"
    >;
};

export default function ExerciciosExecutar({ route }: Props) {
    const [qtdRepeticoesDesejada, setQtdRepeticoesDesejada] =
        useState<string>("");

    const [qtdExecucoes, setQtdExecucoes] = useState<number>(0);

    const executouDescidaRef = useRef(false);
    const [isStart, setIsStart] = useState<boolean>(false);

    const [dataAcelerometro, setDataAcelerometro] = useState({ x: 0, y: 0, z: 0 });

    const { id_exercicio } = route.params;

    const { exercicio, buscarExercicio } =
        useExercicio();

    useEffect(() => {
        console.log(id_exercicio)
        buscarExercicio(id_exercicio);
    }, []);

    useEffect(() => {
        let subscription: any = null;

        if (isStart && exercicio) {
            Accelerometer.setUpdateInterval(100);

            subscription = Accelerometer.addListener(({ x, y, z }) => {
                setDataAcelerometro({ x, y, z });

                const valorAtual = y;

                const limiteMin = exercicio.limiteMin;
                const limiteMax = exercicio.limiteMax;

                if (
                    valorAtual >= limiteMax &&
                    !executouDescidaRef.current
                ) {
                    console.log("DESCIDA DETECTADA");
                    executouDescidaRef.current = true;
                }

                if (
                    executouDescidaRef.current &&
                    valorAtual <= limiteMin
                ) {
                    console.log("REPETIÇÃO CONTADA");

                    setQtdExecucoes((old) => old + 1);
                    executouDescidaRef.current = false;
                }
            });
        }

        return () => {
            subscription?.remove();
        };
    }, [isStart, exercicio]);



    async function iniciarExercicio() {
        if (!exercicio) return;

        executouDescidaRef.current = false;
        setQtdExecucoes(0);
        setIsStart(true);
    }

    async function finalizarExercicio() {
        setIsStart(false);
        executouDescidaRef.current = false;
    }

    async function finalizarExercicioAutomaticamente() {

    }

    async function contaRepeticao() {

    }


    return (
        <View style={styles.container}>
            <Header title="Executar Exercício" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* CARD PRINCIPAL */}

                <View style={styles.exerciseCard}>
                    <View style={styles.iconContainer}>
                        <Ionicons
                            name="fitness"
                            size={40}
                            color="#22C55E"
                        />
                    </View>

                    <Text style={styles.exerciseName}>
                        {exercicio?.nome || "Carregando..."}
                    </Text>

                    <Text style={styles.exerciseDescription}>
                        {exercicio?.descricao}
                    </Text>
                </View>

                {/* SENSOR */}

                <View style={styles.infoCard}>
                    <Ionicons
                        name={
                            exercicio?.usaGiroscopio
                                ? "phone-portrait"
                                : "walk"
                        }
                        size={24}
                        color="#FF7A00"
                    />

                    <View style={styles.infoContent}>
                        <Text style={styles.infoTitle}>
                            Sensor utilizado
                        </Text>

                        <Text style={styles.infoText}>
                            {exercicio?.usaGiroscopio
                                ? "Giroscópio"
                                : "Acelerômetro"}
                        </Text>
                    </View>
                </View>

                {/* META */}

                <View style={styles.card}>
                    <Text style={styles.label}>
                        Meta de repetições (opcional)
                    </Text>

                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Ex: 50"
                        placeholderTextColor="#64748B"
                        value={qtdRepeticoesDesejada}
                        onChangeText={
                            setQtdRepeticoesDesejada
                        }
                    />

                    <Text style={styles.helperText}>
                        Caso informado, o aplicativo
                        exibirá o progresso até atingir a
                        meta.
                    </Text>
                </View>

                {/* EXECUÇÃO */}

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
                </View>

                {/* BOTÃO */}

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.button, isStart ? styles.buttonStop : styles.buttonStart]}
                    onPress={() => isStart ? finalizarExercicio() : iniciarExercicio()}
                >
                    <Ionicons
                        name={isStart ? "stop" : "play"}
                        size={24}
                        color="#FFF"
                    />

                    <Text style={styles.startButtonText}>
                        {isStart ? 'Finalizar exercicio' : 'Iniciar Exercício'}
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

    exerciseCard: {
        backgroundColor: "#1B2330",
        borderRadius: 22,
        padding: 24,
        alignItems: "center",
    },

    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#121821",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },

    exerciseName: {
        color: "#FFF",
        fontSize: 24,
        fontWeight: "700",
        textAlign: "center",
    },

    exerciseDescription: {
        color: "#94A3B8",
        marginTop: 10,
        textAlign: "center",
        lineHeight: 22,
    },

    infoCard: {
        backgroundColor: "#1B2330",
        borderRadius: 18,
        padding: 18,
        marginTop: 18,
        flexDirection: "row",
        alignItems: "center",
    },

    infoContent: {
        marginLeft: 15,
    },

    infoTitle: {
        color: "#FFF",
        fontWeight: "600",
    },

    infoText: {
        color: "#94A3B8",
        marginTop: 3,
    },

    card: {
        backgroundColor: "#1B2330",
        borderRadius: 18,
        padding: 18,
        marginTop: 18,
    },

    label: {
        color: "#FFF",
        fontWeight: "600",
        marginBottom: 10,
    },

    input: {
        backgroundColor: "#121821",
        borderRadius: 14,
        height: 55,
        paddingHorizontal: 15,
        color: "#FFF",
        borderWidth: 1,
        borderColor: "#263244",
    },

    helperText: {
        color: "#94A3B8",
        marginTop: 10,
        fontSize: 13,
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

    button: {
        height: 60,
        borderRadius: 18,
        marginTop: 25,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
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