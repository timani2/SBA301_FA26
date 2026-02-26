package fu.se.sba301.phongtt.a3tatanphong_se18d04.services;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.Customer;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.reposirories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Customer tự đăng ký tài khoản [cite: 53, 63]
    public Customer register(Customer customer) {
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        customer.setCustomerStatus(1); // Active
        return customerRepository.save(customer);
    }

    // Staff xem toàn bộ danh sách khách hàng [cite: 49, 59]
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    // Cập nhật profile (Dùng cho cả Staff và Customer) [cite: 55, 65]
    public Customer updateCustomer(Integer id, Customer details) {
        Customer customer = customerRepository.findById(id).orElseThrow();
        customer.setCustomerFullName(details.getCustomerFullName());
        customer.setTelephone(details.getTelephone());
        // Không cho phép đổi email nếu email là unique identifier
        return customerRepository.save(customer);
    }
}