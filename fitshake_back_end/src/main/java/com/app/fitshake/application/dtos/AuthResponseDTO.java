package com.app.fitshake.application.dtos;

public record AuthResponseDTO(
        Long id,
        String nome,
        String email,
        String mensagem,
        Boolean sucesso
) {
}