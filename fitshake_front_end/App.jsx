import { useEffect } from "react";
import { AbaLateralProvider } from "./src/context/AbaLateralProvider";
import { AuthProvider } from "./src/context/AuthProvider";
import { LoadingProvider } from "./src/context/LoadingProvider";
import { AppRoutes } from "./src/routes/Routes";


export default function App() {
    useEffect(() => {
        console.warn("AQUi")
    }, [])
    return (
        <LoadingProvider>
            <AuthProvider>
                <AbaLateralProvider>
                    <AppRoutes />
                </AbaLateralProvider>
            </AuthProvider>
        </LoadingProvider>
    )
}