package com.app.fitshake.application.dtos;

import com.app.fitshake.domain.entities.Usuario;

public record AuthResponseDTO(
                Long id,
                String nome,
                String email,
                String mensagem,
                String role,
                Boolean sucesso) {

        public AuthResponseDTO(Usuario usuario) {
                this(
                                usuario.getId(),
                                usuario.getNome(),
                                usuario.getEmail(),
                                usuario.getRole(),
                                null,
                                true);
        }
}