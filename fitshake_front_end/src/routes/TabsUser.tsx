import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
        </Tab.Navigator     >
    )
}