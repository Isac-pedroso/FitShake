package com.app.fitshake.application.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.fitshake.application.dtos.AuthRequestDTO;
import com.app.fitshake.application.dtos.AuthResponseDTO;
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

    public AuthResponseDTO cadastrar(AuthRequestDTO dto) {

        boolean isExisteEmail = usuarioRepository
                .existsByNome(dto.email());

        if (isExisteEmail)
            throw new RuntimeException("Email invalido !");

        boolean isExisteNome = usuarioRepository
                .existsByNome(dto.email());

        if (isExisteNome)
            throw new RuntimeException("Nome invalido, escolha outro nome !");

        if (dto.senha() == null || dto.senha().isEmpty()) {
            throw new RuntimeException("Por favor informe uma senha !");
        }

        Usuario usuario = new Usuario();

        usuario.setNome(dto.nome());
        usuario.setEmail(dto.email());
        usuario.setSenha(dto.senha());
        usuario.setRole("user");
        usuario.setId(null);
        usuarioRepository.save(usuario);

        return new AuthResponseDTO(usuario);
    }
}
