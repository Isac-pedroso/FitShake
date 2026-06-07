import Header from "@/src/components/Header";
import { useExercicio } from "@/src/features/exercicio/exercicio.hooks";
import { Ionicons } from "@expo/vector-icons";
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

export default function Exercicios() {
    const navigation = useNavigation<any>();

    const [refreshing, setRefreshing] = useState(false);
    const { exercicios, getTodosExercicios } = useExercicio();


    useEffect(() => {
        getTodosExercicios();
    }, [])
    const [search, setSearch] = useState("");

    const exerciciosFiltrados = useMemo(() => {
        return exercicios.filter((item) =>
            item.nome
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [search, exercicios]);



    async function onRefresh() {
        setRefreshing(true);

        try {
            await getTodosExercicios();
        } finally {
            setRefreshing(false);
        }
    }
    return (
        <View style={styles.container}>
            <Header title="Exercícios" />

            <View style={styles.searchContainer}>
                <Ionicons
                    name="search"
                    size={20}
                    color="#94A3B8"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Buscar exercício..."
                    placeholderTextColor="#94A3B8"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <FlatList
                data={exerciciosFiltrados}
                keyExtractor={(item) =>
                    item.id.toString()
                }
                contentContainerStyle={{
                    padding: 20,
                    paddingBottom: 120,
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        activeOpacity={0.8}
                        onPress={() =>
                            navigation.navigate(
                                "ExerciciosExecutar",
                                {
                                    id_exercicio: item?.id,
                                }
                            )
                        }
                    >
                        <View style={styles.iconBox}>
                            <Ionicons
                                name="fitness"
                                size={24}
                                color="#22C55E"
                            />
                        </View>

                        <View style={styles.content}>
                            <Text style={styles.nome}>
                                {item.nome}
                            </Text>

                            <Text
                                style={styles.descricao}
                                numberOfLines={2}
                            >
                                {item.descricao}
                            </Text>
                        </View>

                        <Ionicons
                            name="chevron-forward"
                            size={22}
                            color="#94A3B8"
                        />
                    </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Ionicons
                            name="barbell-outline"
                            size={70}
                            color="#475569"
                        />

                        <Text style={styles.emptyTitle}>
                            Nenhum exercício encontrado
                        </Text>

                        <Text style={styles.emptyText}>
                            Tente outro termo de pesquisa.
                        </Text>
                    </View>
                )}
            />
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
        borderRadius: 15,
        paddingHorizontal: 15,
        height: 52,
    },

    input: {
        flex: 1,
        marginLeft: 10,
        color: "#FFF",
    },

    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1B2330",
        borderRadius: 18,
        padding: 16,
        marginBottom: 12,
    },

    iconBox: {
        width: 55,
        height: 55,
        borderRadius: 14,
        backgroundColor: "#121821",
        justifyContent: "center",
        alignItems: "center",
    },

    content: {
        flex: 1,
        marginLeft: 15,
    },

    nome: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "700",
    },

    descricao: {
        color: "#94A3B8",
        marginTop: 5,
        lineHeight: 20,
    },

    emptyContainer: {
        alignItems: "center",
        marginTop: 80,
    },

    emptyTitle: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "700",
        marginTop: 15,
    },

    emptyText: {
        color: "#94A3B8",
        marginTop: 5,
    },
});