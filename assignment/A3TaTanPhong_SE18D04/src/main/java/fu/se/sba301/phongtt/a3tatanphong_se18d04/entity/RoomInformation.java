package fu.se.sba301.phongtt.a3tatanphong_se18d04.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Table(name = "RoomInformation")
@Data
public class RoomInformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roomId;

    @NotBlank
    private String roomNumber;

    private String roomDetailDescription;
    private Integer roomMaxCapacity;
    private Double roomPricePerDay;

    private Integer roomStatus;

    @ManyToOne
    @JoinColumn(name = "RoomTypeID")
    private RoomType roomType;
}