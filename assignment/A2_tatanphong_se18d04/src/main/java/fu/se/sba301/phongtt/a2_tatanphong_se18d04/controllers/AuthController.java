package fu.se.sba301.phongtt.a2_tatanphong_se18d04.controllers;
import fu.se.sba301.phongtt.a2_tatanphong_se18d04.dto.LoginRequest;
import fu.se.sba301.phongtt.a2_tatanphong_se18d04.pojos.SystemAccount;
import fu.se.sba301.phongtt.a2_tatanphong_se18d04.services.JwtService;
import fu.se.sba301.phongtt.a2_tatanphong_se18d04.services.SystemAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private SystemAccountService accountService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        SystemAccount account = accountService.login(loginRequest.getEmail(), loginRequest.getPassword());
        if (account != null) {
            String token = jwtService.generateToken(account);
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("role", account.getAccountRole());
            response.put("email", account.getAccountEmail());
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sai email hoặc mật khẩu!");
    }
}