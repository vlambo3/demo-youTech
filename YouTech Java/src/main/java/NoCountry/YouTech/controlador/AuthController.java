package NoCountry.YouTech.controlador;

import NoCountry.YouTech.dto.auth.AuthenticationRequestDTO;
import NoCountry.YouTech.dto.auth.AuthenticationResponseDTO;
import NoCountry.YouTech.dto.user.UserRequestDTO;
import NoCountry.YouTech.security.auth.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService service;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRequestDTO user) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(user));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDTO> login(@RequestBody AuthenticationRequestDTO authRequest) throws Exception {
        return ResponseEntity.ok(service.authenticate(authRequest));
    }


}
