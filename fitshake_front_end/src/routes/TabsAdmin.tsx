import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExerciciosAdmin from "../screen/admin/ExerciciosAdmin";


const Tab = createBottomTabNavigator();

export function TabsAdmin() {
 
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
            <Tab.Screen name="ExerciciosAdmin" component={ExerciciosAdmin} />
        </Tab.Navigator>
    )
}