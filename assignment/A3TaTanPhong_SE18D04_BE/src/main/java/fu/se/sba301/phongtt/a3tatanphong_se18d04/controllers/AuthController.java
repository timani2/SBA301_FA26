package fu.se.sba301.phongtt.a3tatanphong_se18d04.controllers;


import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request.LoginRequest;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request.RegisterRequest;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response.ApiResponse;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response.AuthResponse;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ApiResponse<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        return new ApiResponse<>(
                "Register successfully",
                authService.register(request)
        );
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(
            @Valid @RequestBody LoginRequest request) {

        return new ApiResponse<>(
                "Login successfully",
                authService.login(request)
        );
    }
}