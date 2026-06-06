package com.app.fitshake.application.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.app.fitshake.application.dtos.*;
import com.app.fitshake.domain.entities.Exercicio;
import com.app.fitshake.domain.repositories.ExercicioRepository;

@Service
public class ExercicioService {

    private final ExercicioRepository repository;

    public ExercicioService(
            ExercicioRepository repository) {
        this.repository = repository;
    }

    public List<Exercicio> listar() {
        return repository.findAll();
    }

    public Exercicio buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Exercício não encontrado"));
    }

    public Exercicio criar(
            ExercicioRequest request) {

        Exercicio exercicio = new Exercicio();

        exercicio.setNome(request.nome());
        exercicio.setDescricao(request.descricao());
        exercicio.setLimiteMin(request.limiteMin());
        exercicio.setLimiteMax(request.limiteMax());
        exercicio.setUsaGiroscopio(
                request.usaGiroscopio());

        exercicio.setAtualizadoEm(
                LocalDate.now());

        return repository.save(exercicio);
    }

    public Exercicio atualizar(
            Long id,
            ExercicioRequest request) {

        Exercicio exercicio = buscar(id);

        exercicio.setNome(request.nome());
        exercicio.setDescricao(request.descricao());
        exercicio.setLimiteMin(request.limiteMin());
        exercicio.setLimiteMax(request.limiteMax());
        exercicio.setUsaGiroscopio(
                request.usaGiroscopio());

        exercicio.setAtualizadoEm(
                LocalDate.now());

        return repository.save(exercicio);
    }

    public void deletar(Long id) {

        Exercicio exercicio = buscar(id);

        exercicio.setExcluidoEm(
                LocalDate.now());

        repository.save(exercicio);
    }
}