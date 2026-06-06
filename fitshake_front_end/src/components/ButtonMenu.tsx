import { Text, TouchableOpacity } from "react-native";
import { useAbaLateral } from "../context/AbaLateralProvider";

export default function ButtonMenu() {

    const { showAbaLateral } =
        useAbaLateral();

    return (
        <TouchableOpacity
            onPress={showAbaLateral}
            style={{
                width: 45,
                height: 45,

                borderRadius: 12,

                backgroundColor: "#182235",

                borderWidth: 1,
                borderColor: "#334155",

                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text
                style={{
                    color: "#22C55E",
                    fontSize: 22,
                    fontWeight: "bold",
                }}
            >
                ☰
            </Text>
        </TouchableOpacity>
    );
}