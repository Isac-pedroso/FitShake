

export type ExercicioRequest = {
    nome: string;
    descricao: string;
    limiteMin: number;
    limiteMax: number;
    usaGiroscopio: boolean;
}



export type ExercicioResponse = {
    id: number;
    nome: string;
    descricao: string;
    limiteMin: number;
    limiteMax: number;
    usaGiroscopio: boolean;
    atualizadoEm: Date;
}