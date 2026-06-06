import {
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";

import { LoadingModal } from "../components/LoadingModal";

type LoadingContextType = {
    showLoading: (msg?: string) => void;
    hideLoading: () => void;

    setMsgLoading: (msg: string) => void;

    setIsError: () => void;
    setIsSuccess: () => void;

    resetLoadingStyle: () => void;
};

const LoadingContext = createContext(
    {} as LoadingContextType
);

export function LoadingProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [visible, setVisible] = useState(false);
    const [msg, setMsg] = useState("Carregando...");
    const [isError, setError] = useState(false);
    const [isSuccess, setSuccess] = useState(false);

    function showLoading(
        message = "Carregando..."
    ) {
        setMsg(message);

        setError(false);
        setSuccess(false);

        setVisible(true);
    }

    function hideLoading() {
        setVisible(false);
    }

    function setMsgLoading(message: string) {
        setMsg(message);
    }

    function setIsError() {
        setError(true);
        setSuccess(false);
    }

    function setIsSuccess() {
        setSuccess(true);
        setError(false);
    }

    function resetLoadingStyle() {
        setError(false);
        setSuccess(false);
    }

    return (
        <LoadingContext.Provider
            value={{
                showLoading,
                hideLoading,
                setMsgLoading,
                setIsError,
                setIsSuccess,
                resetLoadingStyle,
            }}
        >
            {children}

            <LoadingModal
                visible={visible}
                msg={msg}
                isError={isError}
                isSuccess={isSuccess}
            />
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    return useContext(LoadingContext);
}