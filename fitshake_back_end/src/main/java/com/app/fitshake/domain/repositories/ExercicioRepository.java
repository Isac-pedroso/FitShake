package com.app.fitshake.domain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.fitshake.domain.entities.Exercicio;;

public interface ExercicioRepository
        extends JpaRepository<Exercicio, Long> {
}