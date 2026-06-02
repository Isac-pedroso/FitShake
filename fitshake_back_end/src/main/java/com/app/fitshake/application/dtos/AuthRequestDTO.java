package com.app.fitshake.application.dtos;

public record AuthRequestDTO(
        String nome,
        String email,
        String senha) {

    public AuthRequestDTO(String nome, String email, String senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
}
