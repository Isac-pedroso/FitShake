import Header from "@/src/components/Header";
import { useLoading } from "@/src/context/LoadingProvider";
import { useExercicio } from "@/src/features/exercicio/exercicio.hooks";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ExerciciosAdmin() {
    const navigation = useNavigation<any>();

    const {
        exercicios,
        getTodosExercicios,
    } = useExercicio();

    const {
        showLoading,
        hideLoading,
        setIsError,
        setIsSuccess,
        setMsgLoading,
    } = useLoading();

    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        carregarExercicios();
    }, []);

    async function carregarExercicios() {
        let hasError = false;

        try {
            showLoading("Carregando exercícios...");

            await getTodosExercicios();

            setIsSuccess();
            setMsgLoading("Exercícios carregados!");
        } catch (error: any) {
            hasError = true;

            setIsError();
            setMsgLoading(
                error || "Erro ao carregar exercícios."
            );
        } finally {
            setTimeout(() => {
                hideLoading();
            }, hasError ? 1500 : 500);
        }
    }

    async function onRefresh() {
        setRefreshing(true);

        try {
            await getTodosExercicios();
        } finally {
            setRefreshing(false);
        }
    }

    const exerciciosFiltrados = useMemo(() => {
        return exercicios.filter((item) =>
            item.nome.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, exercicios]);

    function renderItem({ item }: any) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.card}
                onPress={async () => {
                    navigation.navigate("CadastroExercicio", {
                        id: item.id,
                    })
                }
                }
            >
                <View style={styles.cardHeader}>
                    <Text style={styles.nome}>
                        {item.nome}
                    </Text>

                    <View
                        style={[
                            styles.badge,
                            item.usaGiroscopio
                                ? styles.badgeGiro
                                : styles.badgeMovimento,
                        ]}
                    >
                        <Text style={styles.badgeText}>
                            {item.usaGiroscopio
                                ? "Giroscópio"
                                : "Acelerômetro"}
                        </Text>
                    </View>
                </View>

                <Text
                    style={styles.descricao}
                    numberOfLines={2}
                >
                    {item.descricao}
                </Text>

                <View style={styles.infoContainer}>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>
                            Limite Min
                        </Text>

                        <Text style={styles.infoValue}>
                            {item.limiteMin}
                        </Text>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>
                            Limite Max
                        </Text>

                        <Text style={styles.infoValue}>
                            {item.limiteMax}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <Header title="Exercícios" />

            <View style={styles.searchContainer}>
                <Ionicons
                    name="search"
                    size={20}
                    color="#8A8A8A"
                />

                <TextInput
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Pesquisar exercício..."
                    placeholderTextColor="#8A8A8A"
                    style={styles.input}
                />
            </View>

            <FlatList
                data={exerciciosFiltrados}
                keyExtractor={(item) =>
                    item.id.toString()
                }
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingBottom: 120,
                    paddingHorizontal: 20,
                }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Ionicons
                            name="barbell-outline"
                            size={80}
                            color="#444"
                        />

                        <Text style={styles.emptyTitle}>
                            Nenhum exercício encontrado
                        </Text>

                        <Text style={styles.emptyText}>
                            Cadastre um novo exercício para
                            começar.
                        </Text>
                    </View>
                )}
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={async () => {
                    await AsyncStorage.removeItem("dadosCadExercicioTEMP");
                    navigation.navigate(
                        "ExercicioCadastro"
                    )
                }
                }
            >
                <Ionicons
                    name="add"
                    size={32}
                    color="#FFF"
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0E1117",
    },

    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1B2330",
        marginHorizontal: 20,
        marginTop: 15,
        borderRadius: 14,
        paddingHorizontal: 15,
        height: 52,
    },

    input: {
        flex: 1,
        color: "#FFF",
        marginLeft: 10,
        fontSize: 15,
    },

    card: {
        backgroundColor: "#1B2330",
        borderRadius: 18,
        padding: 18,
        marginTop: 15,
    },

    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    nome: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "700",
        flex: 1,
        marginRight: 10,
    },

    descricao: {
        color: "#A8B3C2",
        marginTop: 10,
        lineHeight: 20,
    },

    badge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 30,
    },

    badgeGiro: {
        backgroundColor: "#FF7A00",
    },

    badgeMovimento: {
        backgroundColor: "#00C896",
    },

    badgeText: {
        color: "#FFF",
        fontWeight: "600",
        fontSize: 12,
    },

    infoContainer: {
        flexDirection: "row",
        marginTop: 18,
        gap: 12,
    },

    infoBox: {
        flex: 1,
        backgroundColor: "#121821",
        padding: 12,
        borderRadius: 12,
    },

    infoLabel: {
        color: "#8A8A8A",
        fontSize: 12,
    },

    infoValue: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "700",
        marginTop: 4,
    },

    fab: {
        position: "absolute",
        right: 25,
        bottom: 30,
        width: 65,
        height: 65,
        borderRadius: 32,
        backgroundColor: "#FF7A00",
        justifyContent: "center",
        alignItems: "center",
        elevation: 10,
    },

    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100,
    },

    emptyTitle: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "700",
        marginTop: 15,
    },

    emptyText: {
        color: "#8A8A8A",
        marginTop: 10,
        textAlign: "center",
        paddingHorizontal: 40,
    },
});