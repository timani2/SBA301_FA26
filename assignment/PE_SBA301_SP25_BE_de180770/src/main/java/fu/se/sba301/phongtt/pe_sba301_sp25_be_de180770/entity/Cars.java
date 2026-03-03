package fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "Cars")
@Data
public class Cars {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer carID;

    @Column(columnDefinition = "nvarchar(40)", nullable = false)
    private String carName;

    @ManyToOne
    @JoinColumn(name = "CountryID")
    private Country country;

    private Short unitsInStock;
    private Integer unitPrice;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;
}