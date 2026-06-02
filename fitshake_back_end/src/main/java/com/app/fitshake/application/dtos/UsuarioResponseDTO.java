package com.app.fitshake.application.dtos;

public record UsuarioResponseDTO(
        Long id,
        String nome,
        String email,
        String mensagem,
        Boolean sucesso) {

}
