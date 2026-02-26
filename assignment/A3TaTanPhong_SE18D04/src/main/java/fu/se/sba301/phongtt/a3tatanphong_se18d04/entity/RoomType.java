package fu.se.sba301.phongtt.a3tatanphong_se18d04.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "RoomType")
@Data
public class RoomType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roomTypeId;

    @NotBlank
    private String roomTypeName;

    private String typeDescription;
    private String typeNote;

    @OneToMany(mappedBy = "roomType", cascade = CascadeType.ALL)
    private List<RoomInformation> rooms;
}