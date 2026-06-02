package com.app.fitshake.application.services;

import org.springframework.stereotype.Service;

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

    public AuthResponseDTO login(AuthRequestDTO dto) {

        Usuario usuario = usuarioRepository
                .findByEmail(dto.email())
                .orElseThrow(() -> new RuntimeException("Email ou senha inválidos"));

        if (!usuario.getSenha().equals(dto.senha())) {
            throw new RuntimeException("Email ou senha inválidos");
        }

        return new AuthResponseDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                "Login realizado com sucesso",
                true);
    }

    public AuthResponseDTO cadastrar(AuthRequestDTO dto) {

        if (usuarioRepository.existsByNome(dto.nome())) {
            throw new RuntimeException("Usuário já cadastrado com este nome");
        }

        if (usuarioRepository.existsByEmail(dto.email())) {
            throw new RuntimeException("Usuário já cadastrado com este email");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(dto.nome());
        usuario.setEmail(dto.email());
        usuario.setSenha(dto.senha());

        usuario = usuarioRepository.save(usuario);

        return new AuthResponseDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                "Usuário cadastrado com sucesso",
                true);
    }
}