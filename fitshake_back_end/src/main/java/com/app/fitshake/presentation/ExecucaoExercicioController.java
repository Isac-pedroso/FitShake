package com.app.fitshake.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.fitshake.application.dtos.DashBoardExecucoesUser;
import com.app.fitshake.application.dtos.ExecucaoExercicioRequest;
import com.app.fitshake.application.dtos.ExecucaoExercicioResponse;
import com.app.fitshake.application.services.ExecucaoExercicioService;

import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/execucoes-exercicios")
public class ExecucaoExercicioController {

    private final ExecucaoExercicioService service;

    public ExecucaoExercicioController(ExecucaoExercicioService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ExecucaoExercicioResponse> registrar(
            @RequestBody ExecucaoExercicioRequest request
    ) {
        return ResponseEntity.ok(service.registrar(request));
    }

    @GetMapping("/dashBoardUsuario/{id_usuario}")
    public ResponseEntity<?> buscarDashBoard(@PathVariable Long id_usuario) {
        try{
            return ResponseEntity.ok(service.buscarDadosExecucoesExerciciosUsuario(id_usuario));
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
}