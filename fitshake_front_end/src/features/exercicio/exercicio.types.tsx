

export type ExercicioRequest = {
    nome: string;
    descricao: string;
    limiteMin: number;
    limiteMax: number;
    usaGiroscopio: boolean;
    posicionamentoCelular: string,
    descricaoPosicionamento: string,
    fotosPosicionamento: []
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