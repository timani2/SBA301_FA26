package fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "Country")
@Data
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer countryID;
    @Column(columnDefinition = "nvarchar(15)")
    private String countryName;

    @OneToMany(mappedBy = "country")
    @JsonIgnore
    private List<Cars> cars;
}