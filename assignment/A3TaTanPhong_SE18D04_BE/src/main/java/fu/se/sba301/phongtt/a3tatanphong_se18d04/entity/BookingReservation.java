package fu.se.sba301.phongtt.a3tatanphong_se18d04.entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "BookingReservation")
@Data
public class BookingReservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bookingReservationId;

    private LocalDate bookingDate;
    private Double totalPrice;
    private Integer bookingStatus;

    @ManyToOne
    @JoinColumn(name = "CustomerID")
    private Customer customer;

    @OneToMany(mappedBy = "bookingReservation", cascade = CascadeType.ALL)
    private List<BookingDetail> bookingDetails;
}