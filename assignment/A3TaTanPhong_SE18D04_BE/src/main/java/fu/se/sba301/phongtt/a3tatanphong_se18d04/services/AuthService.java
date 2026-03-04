package fu.se.sba301.phongtt.a3tatanphong_se18d04.services;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request.LoginRequest;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request.RegisterRequest;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}