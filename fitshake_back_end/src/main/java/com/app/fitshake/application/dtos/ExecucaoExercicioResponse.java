package com.app.fitshake.application.dtos;

import java.time.LocalDateTime;

public record ExecucaoExercicioResponse(
        Long id,
        Long idUsuario,
        Long idExercicio,
        Integer repeticoes,
        LocalDateTime dataHora,
        String tipoExecucao) {
}