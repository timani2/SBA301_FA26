package fu.se.sba301.phongtt.a3tatanphong_se18d04.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "Customer")
@Data
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer customerId;

    @NotBlank
    private String customerFullName;

    private String telephone;

    @Column(unique = true)
    @Email
    private String emailAddress;

    private LocalDate customerBirthday;
    private Integer customerStatus;

    @NotBlank
    private String password;
}