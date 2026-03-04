package fu.se.sba301.phongtt.a3tatanphong_se18d04.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "booking_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingDetailId;

    @ManyToOne
    @JoinColumn(name = "booking_id", nullable = false)
    private BookingReservation booking;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private RoomInformation  room;

    @Column(nullable = false)
    private Double priceAtBooking;
}