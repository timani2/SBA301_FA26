package fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.controller;



import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.dto.JwtResponse;
import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.dto.LoginRequest;
import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private MemberService memberService; // Sử dụng Service, không dùng Repository trực tiếp

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            JwtResponse response = memberService.login(loginRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Login failed: " + e.getMessage());
        }
    }
}