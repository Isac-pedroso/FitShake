import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.app.fitshake.domain.entities.Usuario;
import com.app.fitshake.domain.repositories.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AdminSeeder implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;

    @Override
    public void run(String... args) {

        String emailAdmin = "admin@fitshake.com";

        if (usuarioRepository.findByEmail(emailAdmin).isEmpty()) {

            Usuario admin = new Usuario();

            admin.setNome("Administrador");
            admin.setEmail(emailAdmin);
            admin.setSenha("123456");
            admin.setRole("admin");

            usuarioRepository.save(admin);

            System.out.println("Usuário administrador criado!");
        }
    }
}