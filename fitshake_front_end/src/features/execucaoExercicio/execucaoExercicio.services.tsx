import api from "@/src/services/api";


export async function execucaoExercicioSalvarServices(data: any) {
    try {
        
        const response = await api.post("/execucoes-exercicios", data);
        console.log(response)
        return response?.data;
    } catch (error: any) {
        throw error?.response?.data ? error?.response?.data : "Ocorreu um problema ao tentar salvar a execução do exercicio !";
    }
}



export async function buscarDashBoardUserService(id_user: number) {
    try {
        
        const response = await api.get(`/execucoes-exercicios/dashBoardUsuario/${id_user}`);
        console.log(response)
        return response?.data;
    } catch (error: any) {
        throw error?.response?.data ? error?.response?.data : "Ocorreu um problema ao tentar salvar a execução do exercicio !";
    }
}