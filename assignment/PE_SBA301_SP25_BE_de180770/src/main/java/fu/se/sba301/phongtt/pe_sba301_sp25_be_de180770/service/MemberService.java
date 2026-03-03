package fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.service;

import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.dto.JwtResponse;
import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.dto.LoginRequest;
import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.entity.AccountMember;
import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.repository.MemberRepository;
import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.config.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {
    @Autowired private MemberRepository memberRepository;
    @Autowired private JwtTokenProvider tokenProvider;

    public JwtResponse login(LoginRequest loginRequest) {
        // Tìm member theo ID
        AccountMember member = memberRepository.findById(loginRequest.getMemberID())
                .orElseThrow(() -> new RuntimeException("Member not found"));

        // Kiểm tra mật khẩu (Sử dụng dữ liệu từ Note 2)
        if (!member.getMemberPassword().equals(loginRequest.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Tạo JWT Token chứa thông tin Role
        String token = tokenProvider.generateToken(member.getMemberID(), member.getMemberRole());

        return new JwtResponse(token, "Bearer", member.getMemberID(), member.getMemberRole());
    }
}