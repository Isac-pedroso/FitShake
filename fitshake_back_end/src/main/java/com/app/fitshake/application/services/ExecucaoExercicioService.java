package com.app.fitshake.application.services;


import org.springframework.stereotype.Service;

import com.app.fitshake.application.dtos.ExecucaoExercicioRequest;
import com.app.fitshake.application.dtos.ExecucaoExercicioResponse;
import com.app.fitshake.domain.entities.ExecucaoExercicio;
import com.app.fitshake.domain.repositories.ExecucaoExercicioRepository;

import java.time.LocalDateTime;

@Service
public class ExecucaoExercicioService {

    private final com.app.fitshake.domain.repositories.ExecucaoExercicioRepository repository;

    public ExecucaoExercicioService(ExecucaoExercicioRepository repository) {
        this.repository = repository;
    }

    public ExecucaoExercicioResponse registrar(ExecucaoExercicioRequest request) {
        ExecucaoExercicio execucao = new ExecucaoExercicio();

        execucao.setIdUsuario(request.idUsuario());
        execucao.setIdExercicio(request.idExercicio());
        execucao.setRepeticoes(request.repeticoes());
        execucao.setTipoExecucao(request.tipoExecucao());
        execucao.setDataHora(LocalDateTime.now());

        ExecucaoExercicio salvo = repository.save(execucao);

        return new ExecucaoExercicioResponse(
                salvo.getId(),
                salvo.getIdUsuario(),
                salvo.getIdExercicio(),
                salvo.getRepeticoes(),
                salvo.getDataHora(),
                salvo.getTipoExecucao());
    }
}