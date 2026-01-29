package fu.se.sba301.phongtt.lab4orchid.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Cho phép tất cả các đường dẫn API [cite: 50, 52]
                        .allowedOrigins("http://localhost:5173") // URL mặc định của Vite
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Các phương thức CRUD [cite: 6, 81]
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}