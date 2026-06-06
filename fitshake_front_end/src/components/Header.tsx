import { Text, View } from "react-native";
import ButtonMenu from "./ButtonMenu";

export default function Header({
    title,
}: {
    title: string;
}) {
    return (
        <View
            style={{
                backgroundColor: "#0B1220",

                flexDirection: "row",

                alignItems: "center",

                paddingTop: 60,
                paddingHorizontal: 20,
                paddingBottom: 15,
            }}
        >
            <ButtonMenu />

            <Text
                style={{
                    color: "#F8FAFC",
                    fontSize: 22,
                    fontWeight: "bold",
                    marginLeft: 15,
                }}
            >
                {title}
            </Text>

        </View>
    );
}