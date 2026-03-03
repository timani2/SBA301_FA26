package fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.config;

import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.config.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.config.JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // 1. Cấu hình CORS cho ReactJS
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:5173"));
                    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(Arrays.asList("*"));
                    config.setAllowCredentials(true);
                    return config;
                }))
                .csrf(csrf -> csrf.disable()) // Tắt CSRF cho REST API
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))


                .authorizeHttpRequests(auth -> auth
                        // Public các API xác thực
                        .requestMatchers("/api/auth/**").permitAll()

                        // Task 2: List all cars - No permissions required
                        .requestMatchers(HttpMethod.GET, "/api/cars/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/countries/**").permitAll()


                        // Task 2: Add & Delete car - Only Admin (Role 1)
                        .requestMatchers(HttpMethod.POST, "/api/cars/**").hasAuthority("1")
                        .requestMatchers(HttpMethod.DELETE, "/api/cars/**").hasAuthority("1")
                        .requestMatchers(HttpMethod.PUT, "/api/cars/**").hasAuthority("1")

                        // Các request còn lại yêu cầu đăng nhập
                        .anyRequest().authenticated()
                );

        // 3. Thêm Filter JWT trước Filter xác thực mặc định
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}