import { execucaoExercicioSalvarServices } from "./execucaoExercicio.services";


export function useExecucaoExercicio() {
    async function execucaoExercicioSalvar(data: any) {
        try {
            const response = await execucaoExercicioSalvarServices(data);

            return response;
        } catch (error: any) {
            throw error;
        }
    }

    return {
        execucaoExercicioSalvar
    }

}