package com.app.fitshake.application.dtos;

public record ExercicioRequest(
    String nome,
    String descricao,
    Double limiteMin,
    Double limiteMax,
    Boolean usaGiroscopio
) {
}