import api from "@/src/services/api";


export async function execucaoExercicioSalvarServices(data: any) {
    try {
        console.log("AQUi")
        const response = await api.post("/execucoes-exercicios", data);
        console.log(response)
        return response?.data;
    } catch (error: any) {
        throw error?.response?.data ? error?.response?.data : "Ocorreu um problema ao tentar salvar a execução do exercicio !";
    }
}