package com.app.fitshake.application.dtos;

public record UsuarioRequestDTO(
        String nome,
        String email,
        String senha) {
    public UsuarioRequestDTO(String nome, String email, String senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
}
