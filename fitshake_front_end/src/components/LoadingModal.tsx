import React from "react";
import {
    ActivityIndicator,
    Modal,
    StyleSheet,
    Text,
    View,
} from "react-native";

type Props = {
    visible: boolean;
    msg: string;
    isError: boolean;
    isSuccess: boolean;
};

export function LoadingModal({
    visible,
    msg,
    isError,
    isSuccess,
}: Props) {
    function getColor() {
        if (isError) return "#ef4444";
        if (isSuccess) return "#22c55e";

        return "#2563eb";
    }

    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <ActivityIndicator
                        size="large"
                        color={getColor()}
                    />

                    <Text
                        style={[
                            styles.message,
                            {
                                color: getColor(),
                            },
                        ]}
                    >
                        {msg}
                    </Text>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },

    container: {
        width: 280,
        minHeight: 160,
        borderRadius: 16,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        elevation: 10,
    },

    message: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
    },
});