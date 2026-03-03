package fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarDTO {
    private Integer carID;
    private String carName;
    private Short unitsInStock;
    private Integer unitPrice;
    private String countryName; // Lấy từ bảng Country
    private Date createdAt;
    private Date updatedAt;
}