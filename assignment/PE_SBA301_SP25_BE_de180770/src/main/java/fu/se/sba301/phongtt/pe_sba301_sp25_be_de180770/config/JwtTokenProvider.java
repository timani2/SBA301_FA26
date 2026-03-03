package fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.config;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtTokenProvider {
    // Key bí mật (nên để dài và phức tạp)
    private final String JWT_SECRET = "YjY0ZjhjMjliYjA2NGE5MGExYTM3MmZkYmIyZDY3YzA0OGM1MGZlYmYyMGM1ZDI0M2UwYzVmZTllM2Y1MDVmYmY4N2Y2Y2M0YmQ0ZGUwZDMwYmI0ZDY3ZGNmYTM0NmY5ZDYwM2VkYzA4YjUyNmU5YmY0ZDE5ZTdkYjU===";
    private final long JWT_EXPIRATION = 86400000L; // 1 ngày

    // Tạo JWT từ thông tin Member
    public String generateToken(String memberId, Integer role) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION);

        return Jwts.builder()
                .setSubject(memberId)
                .claim("role", role) // Lưu Role (1, 2, 3) vào Claim
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                .compact();
    }

    // Lấy MemberID từ JWT
    public String getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    // Lấy Role từ JWT để phân quyền
    public Integer getRoleFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();
        return (Integer) claims.get("role");
    }

    // Kiểm tra tính hợp lệ của Token
    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(authToken);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }
}