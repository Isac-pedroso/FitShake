package com.app.fitshake.application.dtos;

public record ExecucaoExercicioRequest(
        Long idUsuario,
        Long idExercicio,
        Integer repeticoes,
        String tipoExecucao) {
}