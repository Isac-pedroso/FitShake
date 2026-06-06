import api from "@/src/services/api";
import { ExercicioRequest, ExercicioResponse } from "./exercicio.types";


export async function criarExercicio(request: ExercicioRequest): Promise<ExercicioResponse> {
    try {
        const response = await api.post("/exercicio", request);

        return response?.data;
    } catch (error: any) {
        throw error?.response?.data ? error?.response?.data : "Ocorreu um problema ao tentar cadastrar o exercicio !";
    }
}


export async function atualizarExercicio(id: number, dados: ExercicioRequest): Promise<ExercicioResponse> {
    try {
        const response = await api.post("/exercicio/", { params: { id: id }, data: dados });

        return response?.data;
    } catch (error: any) {
        throw error?.response?.data ? error?.response?.data : "Ocorreu um problema ao tentar atualizar o exercicio !";
    }
}

export async function deletarExercicio(id: number): Promise<ExercicioResponse> {
    try {
        const response = await api.post("/exercicio/", {params: {id: id}});

        return response?.data;
    } catch (error: any) {
        throw error?.response?.data ? error?.response?.data : "Ocorreu um problema ao tentar excluir o exercicio !";
    }
}


export async function getExercicios(): Promise<ExercicioResponse[]> {
    try {
        const response = await api.get("/exercicio");

        return response?.data;
    } catch (error: any) {
        throw error?.response?.data ? error?.response?.data : "Ocorreu um problema ao tentar trazer os exercicios !";
    }
}

export async function getExercicio(id: number): Promise<ExercicioResponse> {
    try {
        const response = await api.get(`/exercicio/${id}`);

        return response?.data;
    } catch (error: any) {
        throw error?.response?.data ? error?.response?.data : "Ocorreu um problema ao tentar trazer os exercicios !";
    }
}