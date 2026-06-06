package com.app.fitshake.application.services;

import javax.management.RuntimeErrorException;

import org.springframework.stereotype.Service;

import com.app.fitshake.application.dtos.AuthLoginRequestDTO;
import com.app.fitshake.application.dtos.AuthRequestDTO;
import com.app.fitshake.application.dtos.AuthResponseDTO;
import com.app.fitshake.domain.entities.Usuario;
import com.app.fitshake.domain.repositories.UsuarioRepository;

@Service
public class AuthServices {

    private final UsuarioRepository usuarioRepository;

    public AuthServices(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public AuthResponseDTO login(AuthLoginRequestDTO dto) {

        Usuario usuario = usuarioRepository
                .findByEmail(dto.login())
                .orElseThrow(() -> new RuntimeException("Login ou senha inválidos"));

        if (!usuario.getSenha().equals(dto.senha())) {
            throw new RuntimeException("Login ou senha inválidos");
        }
        System.out.println(usuario.getRole());
        return new AuthResponseDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                "Login realizado com sucesso",
                usuario.getRole(),
                true);
    }

}