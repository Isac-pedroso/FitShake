package com.app.fitshake.application.dtos;

import java.time.LocalDate;

public record ExercicioResponse(
    Long id,
    String nome,
    String descricao,
    Double limiteMin,
    Double limiteMax,
    Boolean usaGiroscopio,
    LocalDate atualizadoEm
) {
}