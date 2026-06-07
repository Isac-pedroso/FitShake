package com.app.fitshake.domain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.fitshake.application.dtos.DashBoardExecucoesUser;
import com.app.fitshake.domain.entities.ExecucaoExercicio;

public interface ExecucaoExercicioRepository extends JpaRepository<ExecucaoExercicio, Long> {

    @Query(value = """
        WITH execucoes_pareadas AS (
            SELECT 
                tipo_execucao AS status,
                data_hora AS hora_inicio,
                LEAD(data_hora) OVER (ORDER BY data_hora) AS hora_fim,
                LEAD(tipo_execucao) OVER (ORDER BY data_hora) AS proximo_status
            FROM execucoes_exercicios
            WHERE id_usuario = :id_usuario
            AND data_hora >= CURRENT_DATE
            AND data_hora < CURRENT_DATE + INTERVAL '1 day'
        )

        select 
            (SELECT COUNT(DISTINCT id_exercicio) 
            FROM execucoes_exercicios 
            WHERE id_usuario = :id_usuario
            AND data_hora >= CURRENT_DATE 
            AND data_hora < CURRENT_DATE + INTERVAL '1 day') AS exercicios_dia,
            COALESCE(SUM(hora_fim - hora_inicio), '00:00:00'::interval) AS tempo_total_geral,
            
            (SELECT COALESCE(SUM(repeticoes), 0) 
            FROM execucoes_exercicios 
            WHERE id_usuario = :id_usuario 
            AND data_hora >= CURRENT_DATE 
            AND data_hora < CURRENT_DATE + INTERVAL '1 day') AS total_repeticoes

        FROM execucoes_pareadas
        WHERE status = 'inicio' 
        AND proximo_status = 'fim';
            """, nativeQuery = true)
    DashBoardExecucoesUser findDashBoardExecucoesUser(@Param("id_usuario") Long id_usuario)
}