package fu.se.sba301.phongtt.a3tatanphong_se18d04.entity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "BookingDetail")
@Data
@IdClass(BookingDetailId.class)
public class BookingDetail {
    @Id
    private Integer bookingReservationId;
    @Id
    private Integer roomId;

    private LocalDate startDate;
    private LocalDate endDate;

    @ManyToOne
    @MapsId("bookingReservationId")
    @JoinColumn(name = "BookingReservationID")
    private BookingReservation bookingReservation;

    @ManyToOne
    @MapsId("roomId")
    @JoinColumn(name = "RoomID")
    private RoomInformation roomInformation;
}