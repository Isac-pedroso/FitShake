package com.app.fitshake.application.dtos;

public record AuthLoginRequestDTO(
        String login,
        String senha) {

    public AuthLoginRequestDTO(String login, String senha) {
        this.login = login;
        this.senha = senha;
    }
}