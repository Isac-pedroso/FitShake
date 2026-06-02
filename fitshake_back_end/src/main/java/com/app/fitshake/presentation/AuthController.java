package com.app.fitshake.presentation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

import com.app.fitshake.application.dtos.AuthRequestDTO;
import com.app.fitshake.application.services.AuthServices;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthServices authServices;

    public AuthController(AuthServices authServices){
        this.authServices = authServices;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthRequestDTO dto) {
        try{
            authServices.login(dto);
            return ResponseEntity.ok("Logado com sucesso !");
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
