package com.app.fitshake.presentation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.fitshake.application.dtos.AuthLoginRequestDTO;
import com.app.fitshake.application.dtos.AuthRequestDTO;
import com.app.fitshake.application.dtos.AuthResponseDTO;
import com.app.fitshake.application.services.UsuarioServices;

@RestController
@RequestMapping("/user")
public class UsuarioController {
    @Autowired
    private UsuarioServices usuarioServices;

    public UsuarioController(UsuarioServices usuarioServices){
        this.usuarioServices = usuarioServices;
    }


    @PostMapping("/cadastrar")
    public ResponseEntity<?> login(@RequestBody AuthRequestDTO dto) {
        try{
            AuthResponseDTO response = usuarioServices.cadastrar(dto);

            return ResponseEntity.ok(response);
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
