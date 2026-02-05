package fu.se.sba301.phongtt.lab6.controllers;

import fu.se.sba301.phongtt.lab6.dto.LoginResponse;
import fu.se.sba301.phongtt.lab6.dto.LoginUserDTO; // Sửa import
import fu.se.sba301.phongtt.lab6.dto.RegisterUserDTO;
import fu.se.sba301.phongtt.lab6.pojos.User;
import fu.se.sba301.phongtt.lab6.services.AuthenticationService;
import fu.se.sba301.phongtt.lab6.services.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDTO registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDTO loginUserDto) { // Sửa Typo DTo -> DTO
        User authenticatedUser = authenticationService.authenticate(loginUserDto);
        String jwtToken = jwtService.generateToken(authenticatedUser);

        // Sử dụng Builder cho LoginResponse
        LoginResponse loginResponse = LoginResponse.builder()
                .token(jwtToken)
                .expiresIn(jwtService.getExpirationTime())
                .build();

        return ResponseEntity.ok(loginResponse);
    }
}