package fu.se.sba301.phongtt.a3tatanphong_se18d04.controllers;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.JwtResponse;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.LoginRequest;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.Customer;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.reposirories.CustomerRepository;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Value("${hotel.staff.email}")
    private String staffEmail;

    @Value("${hotel.staff.password}")
    private String staffPassword;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        // 1. Kiểm tra tài khoản Staff từ application.properties
        if (staffEmail.equals(loginRequest.getEmail()) && staffPassword.equals(loginRequest.getPassword())) {
            String jwt = jwtUtils.generateJwtToken(staffEmail, "ROLE_STAFF");
            return ResponseEntity.ok(new JwtResponse(jwt, "Bearer", staffEmail, "ROLE_STAFF"));
        }

        // 2. Kiểm tra tài khoản Customer từ Database [cite: 44]
        Optional<Customer> customerOpt = customerRepository.findByEmailAddress(loginRequest.getEmail());
        if (customerOpt.isPresent()) {
            Customer customer = customerOpt.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), customer.getPassword())) {
                String jwt = jwtUtils.generateJwtToken(customer.getEmailAddress(), "ROLE_CUSTOMER");
                return ResponseEntity.ok(new JwtResponse(jwt, "Bearer", customer.getEmailAddress(), "ROLE_CUSTOMER"));
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sai email hoặc mật khẩu");
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerCustomer(@RequestBody Customer customer) {
        if (customerRepository.existsByEmailAddress(customer.getEmailAddress())) {
            return ResponseEntity.badRequest().body("Email đã tồn tại!");
        }
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        customer.setCustomerStatus(1);
        customerRepository.save(customer);
        return ResponseEntity.ok("Đăng ký thành công!");
    }
}