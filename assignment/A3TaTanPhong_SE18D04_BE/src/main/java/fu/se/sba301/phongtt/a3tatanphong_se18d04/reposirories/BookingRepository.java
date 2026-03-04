package fu.se.sba301.phongtt.a3tatanphong_se18d04.reposirories;


import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.BookingReservation;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<BookingReservation, Long> {

    List<BookingReservation> findByCustomer(Customer customer);

}