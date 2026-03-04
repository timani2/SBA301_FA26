package fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response;


import lombok.Getter;

@Getter
public class AuthResponse {

    private String token;
    private String email;
    private String role;

    public AuthResponse(String token, String email, String role) {
        this.token = token;
        this.email = email;
        this.role = role;
    }


}