package fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response;
import lombok.Getter;


@Getter
public class ApiResponse<T> {

    private String message;
    private T data;

    public ApiResponse(String message, T data) {
        this.message = message;
        this.data = data;
    }

    // getter
}
