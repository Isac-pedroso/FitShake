import Header from "@/src/components/Header";
import { useAuthProvider } from "@/src/context/AuthProvider";
import { useExecucaoExercicio } from "@/src/features/execucaoExercicio/execucaoExercicio.hooks";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Home() {
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const { dashBoardUser, buscarDashBoardUser } = useExecucaoExercicio();
    const { userInfo } = useAuthProvider();

    useEffect(() => {
        buscarDashBoardUser(Number(userInfo?.id));
    }, [])

    async function onRefresh() {
        setRefreshing(true);

        try {
            await buscarDashBoardUser(Number(userInfo?.id));
        } finally {
            setRefreshing(false)
        }
    }

    function formatarTempo(segundos: number) {
        const horas = Math.floor(segundos / 3600);

        const minutos = Math.floor(
            (segundos % 3600) / 60
        );

        const segundosRestantes = segundos % 60;

        return {
            horas,
            minutos,
            segundos: segundosRestantes
        };
    }

    const tempo = formatarTempo(Number(dashBoardUser?.tempo_total_geral));

    return (
        <View style={styles.container}>
            <Header title="Home" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {/* SAUDAÇÃO */}

                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcome}>
                        Olá, Usuário 👋
                    </Text>

                    <Text style={styles.subtitle}>
                        Continue evoluindo hoje.
                    </Text>
                </View>

                {/* DASHBOARD */}

                <View style={styles.dashboardCard}>
                    <Text style={styles.dashboardTitle}>
                        Resumo de Hoje
                    </Text>

                    <View style={styles.metricsContainer}>
                        <View style={styles.metricBox}>
                            <Ionicons
                                name="barbell"
                                size={24}
                                color="#22C55E"
                            />

                            <Text style={styles.metricValue}>
                                {dashBoardUser?.exercicios_dia}
                            </Text>

                            <Text style={styles.metricLabel}>
                                Exercícios
                            </Text>
                        </View>

                        <View style={styles.metricBox}>
                            <Ionicons
                                name="time"
                                size={24}
                                color="#FF7A00"
                            />

                            <Text style={styles.metricValue}>
                                {`${tempo.minutos}m ${tempo.segundos}s`}
                            </Text>

                            <Text style={styles.metricLabel}>
                                Tempo
                            </Text>
                        </View>

                        <View style={styles.metricBox}>
                            <Ionicons
                                name="flame"
                                size={24}
                                color="#EF4444"
                            />

                            <Text style={styles.metricValue}>
                                {dashBoardUser?.total_repeticoes}
                            </Text>

                            <Text style={styles.metricLabel}>
                                Movimentos
                            </Text>
                        </View>
                    </View>
                </View>

                {/* META DO DIA */}

                <View style={styles.goalCard}>
                    <View>
                        <Text style={styles.goalTitle}>
                            Meta diária
                        </Text>

                        <Text style={styles.goalDescription}>
                            6 de 10 exercícios concluídos
                        </Text>
                    </View>

                    <Text style={styles.goalPercentage}>
                        60%
                    </Text>
                </View>

                {/* ATIVIDADES RECENTES */}

                <Text style={styles.sectionTitle}>
                    Atividades Recentes
                </Text>

                <View style={styles.activityCard}>
                    <View style={styles.iconContainer}>
                        <Ionicons
                            name="fitness"
                            size={24}
                            color="#22C55E"
                        />
                    </View>

                    <View style={styles.activityContent}>
                        <Text style={styles.activityTitle}>
                            Agachamento
                        </Text>

                        <Text style={styles.activityDate}>
                            Hoje • 14:35
                        </Text>
                    </View>

                    <Text style={styles.activityCount}>
                        45x
                    </Text>
                </View>

                <View style={styles.activityCard}>
                    <View style={styles.iconContainer}>
                        <Ionicons
                            name="body"
                            size={24}
                            color="#FF7A00"
                        />
                    </View>

                    <View style={styles.activityContent}>
                        <Text style={styles.activityTitle}>
                            Flexão
                        </Text>

                        <Text style={styles.activityDate}>
                            Hoje • 11:20
                        </Text>
                    </View>

                    <Text style={styles.activityCount}>
                        30x
                    </Text>
                </View>

                <View style={styles.activityCard}>
                    <View style={styles.iconContainer}>
                        <Ionicons
                            name="walk"
                            size={24}
                            color="#3B82F6"
                        />
                    </View>

                    <View style={styles.activityContent}>
                        <Text style={styles.activityTitle}>
                            Corrida Estacionária
                        </Text>

                        <Text style={styles.activityDate}>
                            Ontem • 18:10
                        </Text>
                    </View>

                    <Text style={styles.activityCount}>
                        80x
                    </Text>
                </View>
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

    welcomeContainer: {
        marginBottom: 20,
    },

    welcome: {
        color: "#FFF",
        fontSize: 28,
        fontWeight: "700",
    },

    subtitle: {
        color: "#94A3B8",
        marginTop: 4,
        fontSize: 15,
    },

    dashboardCard: {
        backgroundColor: "#1B2330",
        borderRadius: 20,
        padding: 20,
    },

    dashboardTitle: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 18,
    },

    metricsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    metricBox: {
        alignItems: "center",
        flex: 1,
    },

    metricValue: {
        color: "#FFF",
        fontSize: 22,
        fontWeight: "700",
        marginTop: 10,
    },

    metricLabel: {
        color: "#94A3B8",
        marginTop: 4,
        fontSize: 12,
    },

    goalCard: {
        marginTop: 18,
        backgroundColor: "#1B2330",
        borderRadius: 20,
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    goalTitle: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
    },

    goalDescription: {
        color: "#94A3B8",
        marginTop: 5,
    },

    goalPercentage: {
        color: "#22C55E",
        fontSize: 28,
        fontWeight: "800",
    },

    sectionTitle: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "700",
        marginTop: 28,
        marginBottom: 15,
    },

    activityCard: {
        backgroundColor: "#1B2330",
        borderRadius: 18,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },

    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 14,
        backgroundColor: "#121821",
        justifyContent: "center",
        alignItems: "center",
    },

    activityContent: {
        flex: 1,
        marginLeft: 15,
    },

    activityTitle: {
        color: "#FFF",
        fontSize: 15,
        fontWeight: "600",
    },

    activityDate: {
        color: "#94A3B8",
        marginTop: 3,
    },

    activityCount: {
        color: "#22C55E",
        fontSize: 18,
        fontWeight: "700",
    },
});