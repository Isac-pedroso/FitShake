import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TesteAcelerometro from "../screen/testeAce/indext";
import Exercicios from "../screen/user/Exercicios";
import Home from "../screen/user/Home";


const Tab = createBottomTabNavigator();

export function TabsUser() {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#182235",
                    borderTopColor: "#334155",
                },
                tabBarActiveTintColor: "#22C55E",
                tabBarInactiveTintColor: "#94A3B8",
            }}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Exercicios" component={Exercicios} />
            <Tab.Screen name="TesteAce" component={TesteAcelerometro} />
        </Tab.Navigator     >
    )
}