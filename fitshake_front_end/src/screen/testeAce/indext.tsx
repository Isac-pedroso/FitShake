import { Accelerometer } from "expo-sensors";
import { useEffect, useRef, useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function TesteAcelerometro() {
    const [isAtivo, setIsAtivo] = useState(false);

    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    const [magnitude, setMagnitude] = useState(0);
    const [status, setStatus] = useState("PARADO");
    const [shakeCount, setShakeCount] = useState(0);

    const podeContarShake = useRef(true);

    useEffect(() => {
        let subscription: any = null;

        if (isAtivo) {
            Accelerometer.setUpdateInterval(100);

            subscription = Accelerometer.addListener(({ x, y, z }) => {
                setData({ x, y, z });

                const mag = Math.sqrt(
                    x * x +
                    y * y +
                    z * z
                );

                setMagnitude(mag);

                if (mag < 1.2) {
                    setStatus("PARADO");
                } else if (mag >= 1.2 && mag < 2.5) {
                    setStatus("MOVIMENTO LEVE");
                } else {
                    setStatus("MOVIMENTO FORTE");
                }

                if (mag > 2.8 && podeContarShake.current) {
                    setShakeCount((old) => old + 1);

                    podeContarShake.current = false;

                    setTimeout(() => {
                        podeContarShake.current = true;
                    }, 500);
                }
            });
        }

        return () => {
            if (subscription) {
                subscription.remove();
            }
        };
    }, [isAtivo]);

    function resetar() {
        setShakeCount(0);
        setMagnitude(0);
        setStatus("PARADO");
        setData({
            x: 0,
            y: 0,
            z: 0,
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Teste do Acelerômetro
            </Text>

            <Text style={styles.subtitle}>
                Mexa, incline ou sacuda o celular para ver os valores mudando.
            </Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>
                    Eixos
                </Text>

                <Text style={styles.value}>
                    X: {data.x.toFixed(2)}
                </Text>

                <Text style={styles.value}>
                    Y: {data.y.toFixed(2)}
                </Text>

                <Text style={styles.value}>
                    Z: {data.z.toFixed(2)}
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>
                    Magnitude
                </Text>

                <Text style={styles.bigNumber}>
                    {magnitude.toFixed(2)}
                </Text>

                <View style={styles.barBackground}>
                    <View
                        style={[
                            styles.barFill,
                            {
                                width: `${Math.min(
                                    magnitude * 20,
                                    100
                                )}%`,
                            },
                        ]}
                    />
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>
                    Status
                </Text>

                <Text
                    style={[
                        styles.status,
                        status === "MOVIMENTO FORTE" &&
                            styles.statusStrong,
                    ]}
                >
                    {status}
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>
                    Sacudidas detectadas
                </Text>

                <Text style={styles.bigNumber}>
                    {shakeCount}
                </Text>
            </View>

            <TouchableOpacity
                style={[
                    styles.button,
                    isAtivo
                        ? styles.buttonStop
                        : styles.buttonStart,
                ]}
                onPress={() => setIsAtivo(!isAtivo)}
            >
                <Text style={styles.buttonText}>
                    {isAtivo ? "Parar Sensor" : "Iniciar Sensor"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.resetButton}
                onPress={resetar}
            >
                <Text style={styles.resetText}>
                    Resetar
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0E1117",
        padding: 20,
        justifyContent: "center",
    },

    title: {
        color: "#FFF",
        fontSize: 26,
        fontWeight: "800",
        textAlign: "center",
    },

    subtitle: {
        color: "#94A3B8",
        textAlign: "center",
        marginTop: 8,
        marginBottom: 24,
        lineHeight: 20,
    },

    card: {
        backgroundColor: "#1B2330",
        borderRadius: 18,
        padding: 18,
        marginBottom: 14,
    },

    cardTitle: {
        color: "#94A3B8",
        fontSize: 14,
        marginBottom: 10,
    },

    value: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 4,
    },

    bigNumber: {
        color: "#22C55E",
        fontSize: 42,
        fontWeight: "800",
        textAlign: "center",
    },

    barBackground: {
        height: 10,
        backgroundColor: "#121821",
        borderRadius: 10,
        overflow: "hidden",
        marginTop: 14,
    },

    barFill: {
        height: "100%",
        backgroundColor: "#22C55E",
        borderRadius: 10,
    },

    status: {
        color: "#22C55E",
        fontSize: 24,
        fontWeight: "800",
        textAlign: "center",
    },

    statusStrong: {
        color: "#FF7A00",
    },

    button: {
        height: 58,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },

    buttonStart: {
        backgroundColor: "#22C55E",
    },

    buttonStop: {
        backgroundColor: "#EF4444",
    },

    buttonText: {
        color: "#FFF",
        fontSize: 17,
        fontWeight: "700",
    },

    resetButton: {
        marginTop: 14,
        alignItems: "center",
    },

    resetText: {
        color: "#94A3B8",
        fontSize: 15,
        fontWeight: "600",
    },
});