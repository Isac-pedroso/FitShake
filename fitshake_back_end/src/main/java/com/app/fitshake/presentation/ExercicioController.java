package com.app.fitshake.presentation;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.app.fitshake.application.dtos.*;
import com.app.fitshake.domain.entities.Exercicio;
import com.app.fitshake.application.services.ExercicioService;

@RestController
@RequestMapping("/exercicio")
public class ExercicioController {

    private final ExercicioService service;

    public ExercicioController(
            ExercicioService service) {
        this.service = service;
    }

    @GetMapping
    public List<Exercicio> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Exercicio buscar(
            @PathVariable Long id) {

        return service.buscar(id);
    }

    @PostMapping
    public Exercicio criar(
            @RequestBody ExercicioRequest request) {

        return service.criar(request);
    }

    @PutMapping("/{id}")
    public Exercicio atualizar(
            @PathVariable Long id,
            @RequestBody ExercicioRequest request) {

        return service.atualizar(id, request);
    }

    @DeleteMapping("/{id}")
    public void deletar(
            @PathVariable Long id) {

        service.deletar(id);
    }
}