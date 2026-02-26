package fu.se.sba301.phongtt.a3tatanphong_se18d04.controllers;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.Customer;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    // Staff xem danh sách khách hàng [cite: 49, 58, 59]
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_STAFF')")
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    // Customer xem/cập nhật profile cá nhân
    @PutMapping("/profile/{id}")
    @PreAuthorize("hasAuthority('ROLE_CUSTOMER') or hasAuthority('ROLE_STAFF')")
    public Customer updateProfile(@PathVariable Integer id, @RequestBody Customer customer) {
        return customerService.updateCustomer(id, customer);
    }
}