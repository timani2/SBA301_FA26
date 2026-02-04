package fu.se.sba301.phongtt.a2_tatanphong_se18d04.controllers;
import fu.se.sba301.phongtt.a2_tatanphong_se18d04.dto.LoginRequest;
import fu.se.sba301.phongtt.a2_tatanphong_se18d04.pojos.SystemAccount;
import fu.se.sba301.phongtt.a2_tatanphong_se18d04.services.SystemAccountService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private SystemAccountService accountService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        SystemAccount account = accountService.login(loginRequest.getEmail(), loginRequest.getPassword());
        if (account != null) {
            return ResponseEntity.ok(account); // Trả về thông tin user (bao gồm role) cho ReactJS
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sai email hoặc mật khẩu!");
    }
}