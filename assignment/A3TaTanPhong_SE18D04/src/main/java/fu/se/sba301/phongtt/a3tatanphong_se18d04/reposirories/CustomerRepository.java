package fu.se.sba301.phongtt.a3tatanphong_se18d04.reposirories;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    // Tìm khách hàng bằng email để phục vụ xác thực JWT
    Optional<Customer> findByEmailAddress(String emailAddress);
    Boolean existsByEmailAddress(String emailAddress);
}