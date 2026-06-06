import { createContext, ReactNode, useContext, useState } from "react";
import AbaLateral from "../components/AbaLateral";



type AbaLateralContextType = {
    isShowAbaLateral: boolean;
    showAbaLateral: () => void;
    hideAbaLateral: () => void;
}

const AbaLateralContext = createContext<AbaLateralContextType>({} as AbaLateralContextType);

type AbaLateralProps = {
    children: ReactNode;
};


export function AbaLateralProvider({ children }: AbaLateralProps) {
    const [isShowAbaLateral, setIsShowAbaLateral] = useState<boolean>(false);

    const showAbaLateral = () => setIsShowAbaLateral(true);
    const hideAbaLateral = () => setIsShowAbaLateral(false);

    return (
        <AbaLateralContext.Provider value={{ isShowAbaLateral, showAbaLateral, hideAbaLateral }}>
            {children}
            <AbaLateral
                isShow={isShowAbaLateral}
                onClose={hideAbaLateral}
            />
        </AbaLateralContext.Provider>
    )
}

export const useAbaLateral = () => useContext(AbaLateralContext);