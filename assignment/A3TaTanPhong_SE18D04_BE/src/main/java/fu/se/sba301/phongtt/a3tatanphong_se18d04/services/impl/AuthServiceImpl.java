package fu.se.sba301.phongtt.a3tatanphong_se18d04.services.impl;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.config.JwtService;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request.LoginRequest;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request.RegisterRequest;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response.AuthResponse;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.Customer;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.exception.AppException;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.exception.ErrorCode;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.mapper.CustomerMapper;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.reposirories.CustomerRepository;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public AuthResponse register(RegisterRequest request) {

        if (customerRepository.existsByEmail((request.getEmail()))) {
            throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }

        Customer customer = CustomerMapper.toEntity(request);
        customer.setPassword(passwordEncoder.encode(request.getPassword()));

        customerRepository.save(customer);

        String token = jwtService.generateToken(customer);

        return new AuthResponse(
                token,
                customer.getEmail(),
                customer.getRole().name()
        );
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        Customer customer = customerRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_CREDENTIALS));

        if (!passwordEncoder.matches(request.getPassword(), customer.getPassword())) {
            throw new AppException(ErrorCode.INVALID_CREDENTIALS);
        }

        String token = jwtService.generateToken(customer);

        return new AuthResponse(
                token,
                customer.getEmail(),
                customer.getRole().name()
        );
    }
}