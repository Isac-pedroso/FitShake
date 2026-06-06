import { useState } from "react";
import { atualizarExercicio, criarExercicio, deletarExercicio, getExercicio, getExercicios } from "./exercicio.service";
import { ExercicioRequest, ExercicioResponse } from "./exercicio.types";


export function useExercicio() {

    const [exercicio, setExercicio] = useState<ExercicioResponse | null>(null);
    const [exercicios, setExercicios] = useState<ExercicioResponse[] | []>([]);

    async function cadastrarExercicio(dados: ExercicioRequest) {
        try {
            const response = await criarExercicio(dados);

            return response;
        } catch (error: any) {
            throw error;
        }
    }

    
    async function editarExercicio(id: number, dados: ExercicioRequest) {
        try {
            const response = await atualizarExercicio(id, dados);

            return response;
        } catch (error: any) {
            throw error;
        }
    }


    
    async function excluirExercicio(id: number) {
        try {
            const response = await deletarExercicio(id);

            return response;
        } catch (error: any) {
            throw error;
        }
    }

    async function getTodosExercicios() {
        try {
            const response = await getExercicios();

            setExercicios(response)
            return response;
        } catch (error: any) {
            throw error;
        }
    }

    async function buscarExercicio(id: number) {
        try {

            const response = await getExercicio(id);
            console.log(response)
            setExercicio(response)
            return response;
        } catch (error: any) {
            throw error;
        }
    }
    

    return {
        // Functions
        cadastrarExercicio,
        editarExercicio,
        excluirExercicio,
        buscarExercicio,
        getTodosExercicios,

        // States
        exercicio,
        exercicios
    }
}