package com.app.fitshake.domain.entities;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "exercicio")
public class Exercicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, length = 1000)
    private String descricao;

    @Column(nullable = false)
    private Double limiteMin;

    @Column(nullable = false)
    private Double limiteMax;

    @Column(nullable = false)
    private Boolean usaGiroscopio;

    @Column(nullable = false)
    private LocalDate atualizadoEm;

    @Column(nullable = true)
    private LocalDate excluidoEm;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getLimiteMin() {
        return limiteMin;
    }

    public void setLimiteMin(Double limiteMin) {
        this.limiteMin = limiteMin;
    }

    public Double getLimiteMax() {
        return limiteMax;
    }

    public void setLimiteMax(Double limiteMax) {
        this.limiteMax = limiteMax;
    }

    public Boolean getUsaGiroscopio() {
        return usaGiroscopio;
    }

    public void setUsaGiroscopio(Boolean usaGiroscopio) {
        this.usaGiroscopio = usaGiroscopio;
    }

    public LocalDate getAtualizadoEm() {
        return atualizadoEm;
    }

    public void setAtualizadoEm(LocalDate atualizadoEm) {
        this.atualizadoEm = atualizadoEm;
    }

    public LocalDate getExcluidoEm() {
        return excluidoEm;
    }

    public void setExcluidoEm(LocalDate excluidoEm) {
        this.excluidoEm = excluidoEm;
    }
}