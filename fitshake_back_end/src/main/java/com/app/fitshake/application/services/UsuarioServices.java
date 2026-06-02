package com.app.fitshake.application.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.fitshake.application.dtos.UsuarioRequestDTO;
import com.app.fitshake.application.dtos.UsuarioResponseDTO;
import com.app.fitshake.domain.entities.Usuario;
import com.app.fitshake.domain.repositories.UsuarioRepository;

@Service
public class UsuarioServices {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioServices(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public UsuarioResponseDTO cadastrar(UsuarioRequestDTO dto) {

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

        return new UsuarioResponseDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                "Usuário cadastrado com sucesso",
                true);
    }
}
