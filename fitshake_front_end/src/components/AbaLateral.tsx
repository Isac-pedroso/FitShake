

import { Text, TouchableOpacity, View } from "react-native";
import { useAuthProvider } from "../context/AuthProvider";
type Props = {
    isShow: boolean;
    onClose: () => void;
};

export default function AbaLateral({
    isShow,
    onClose,
}: Props) {

    const { logout } = useAuthProvider();
    if (!isShow) return null;


    async function handleDeslogar() {
        try {
            await logout();
            onClose();
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <View
            style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                zIndex: 999,
                flexDirection: "row",
            }}
        >
            <View
                style={{
                    width: "75%",
                    height: "100%",
                    backgroundColor: "#182235",
                    paddingTop: 60,
                    paddingHorizontal: 20,
                    borderRightWidth: 1,
                    borderRightColor: "#334155",
                }}
            >
                <Text
                    style={{
                        color: "#22C55E",
                        fontSize: 26,
                        fontWeight: "bold",
                        marginBottom: 30,
                    }}
                >
                    💪 FITSHAKE
                </Text>

                <TouchableOpacity
                    style={{
                        paddingVertical: 15,
                    }}
                >
                    <Text
                        style={{
                            color: "#F8FAFC",
                            fontSize: 16,
                        }}
                    >
                        Home
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        paddingVertical: 15,
                    }}
                >
                    <Text
                        style={{
                            color: "#F8FAFC",
                            fontSize: 16,
                        }}
                    >
                        Exercícios
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        paddingVertical: 15,
                    }}
                >
                    <Text
                        style={{
                            color: "#F8FAFC",
                            fontSize: 16,
                        }}
                    >
                        Pacotes
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        paddingVertical: 15,
                    }}
                >
                    <Text
                        style={{
                            color: "#F8FAFC",
                            fontSize: 16,
                        }}
                    >
                        Histórico
                    </Text>
                </TouchableOpacity>

                <View
                    style={{
                        flex: 1,
                        justifyContent: "flex-end",
                        paddingBottom: 40,
                    }}
                >
                    <TouchableOpacity
                        onPress={handleDeslogar}
                        style={{
                            backgroundColor: "#EF4444",
                            borderRadius: 14,
                            height: 55,

                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                color: "#FFF",
                                fontWeight: "bold",
                                fontSize: 16,
                            }}
                        >
                            🚪 Sair da Conta
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity
                activeOpacity={1}
                onPress={onClose}
                style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.65)",
                }}
            />
        </View>
    );
}