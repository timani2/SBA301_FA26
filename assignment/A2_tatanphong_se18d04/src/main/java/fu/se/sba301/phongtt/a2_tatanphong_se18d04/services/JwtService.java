package fu.se.sba301.phongtt.a2_tatanphong_se18d04.services;

import fu.se.sba301.phongtt.a2_tatanphong_se18d04.pojos.SystemAccount;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {
    private static final String SECRET_KEY = "B/LKNlKRWzYJZc/1sZQ+WR4JLEJAELWFFMB9QuJOXoM=";

    public String generateToken(SystemAccount account) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", account.getAccountRole());
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(account.getAccountEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 giờ
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
}