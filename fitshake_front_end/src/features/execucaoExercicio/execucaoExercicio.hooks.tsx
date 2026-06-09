import { useState } from "react";
import { buscarDashBoardUserService, execucaoExercicioSalvarServices } from "./execucaoExercicio.services";


export function useExecucaoExercicio() {

    const [dashBoardUser, setDashBoardUser] = useState<any | null>(null);
    async function execucaoExercicioSalvar(data: any) {
        try {
            const response = await execucaoExercicioSalvarServices(data);

            return response;
        } catch (error: any) {
            throw error;
        }
    }


    async function buscarDashBoardUser(id_user: number) {
        try {

            if(!id_user)
                throw new Error("Usuário não encontrado !");

            const response = await buscarDashBoardUserService(id_user);

            setDashBoardUser(response);
            return response;
        } catch (error: any) {
            throw error;
        }
    }

    return {
        execucaoExercicioSalvar,
        buscarDashBoardUser,
        dashBoardUser
    }

}