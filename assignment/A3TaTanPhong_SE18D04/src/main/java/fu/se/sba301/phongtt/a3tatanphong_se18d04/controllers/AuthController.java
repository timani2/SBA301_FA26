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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    // Lấy thông tin Staff từ application.properties
    @Value("${hotel.staff.email}")
    private String staffEmail;

    @Value("${hotel.staff.password}")
    private String staffPassword;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        // 1. Kiểm tra nếu là Staff [cite: 45, 48]
        if (email.equals(staffEmail) && password.equals(staffPassword)) {
            String jwt = jwtUtils.generateJwtToken(email, "ROLE_STAFF");
            return ResponseEntity.ok(new JwtResponse(jwt, "Bearer", email, "ROLE_STAFF"));
        }

        // 2. Kiểm tra nếu là Customer trong Database
        Optional<Customer> customerOpt = customerRepository.findByEmailAddress(email);
        if (customerOpt.isPresent()) {
            Customer customer = customerOpt.get();
            // So sánh password đã mã hóa
            if (passwordEncoder.matches(password, customer.getPassword())) {
                String jwt = jwtUtils.generateJwtToken(email, "ROLE_CUSTOMER");
                return ResponseEntity.ok(new JwtResponse(jwt, "Bearer", email, "ROLE_CUSTOMER"));
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerCustomer(@RequestBody Customer customer) {
        // Kiểm tra email trùng lặp [cite: 11]
        if (customerRepository.existsByEmailAddress(customer.getEmailAddress())) {
            return ResponseEntity.badRequest().body("Email is already in use!");
        }

        // Mã hóa mật khẩu trước khi lưu
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        customer.setCustomerStatus(1); // Active [cite: 11]
        customerRepository.save(customer);

        return ResponseEntity.ok("Customer registered successfully!");
    }
}