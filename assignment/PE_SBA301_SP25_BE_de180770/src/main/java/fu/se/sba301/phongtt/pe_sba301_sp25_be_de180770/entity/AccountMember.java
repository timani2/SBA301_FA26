package fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "AccountMember")
@Data
public class AccountMember {
    @Id
    @Column(columnDefinition = "nvarchar(20)")
    private String memberID;

    @Column(columnDefinition = "nvarchar(80)")
    private String memberPassword;

    @Column(columnDefinition = "nvarchar(100)")
    private String emailAddress;

    private Integer memberRole;
}