package com.app.fitshake.domain.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.fitshake.domain.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    boolean existsByNome(String nome);

    boolean existsByEmail(String email);

    Optional<Usuario> findByEmail(String email);
}