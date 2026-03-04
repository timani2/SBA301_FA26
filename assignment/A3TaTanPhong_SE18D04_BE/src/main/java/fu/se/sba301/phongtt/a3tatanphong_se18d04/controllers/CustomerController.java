package fu.se.sba301.phongtt.a3tatanphong_se18d04.controllers;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request.UpdateCustomerRequest;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response.ApiResponse;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response.CustomerResponse;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.services.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    // STAFF - get all customers
    @GetMapping("/staff/customers")
    public ApiResponse<List<CustomerResponse>> getAll() {
        return new ApiResponse<>(
                "Get customers successfully",
                customerService.getAll()
        );
    }

    // STAFF - get by id
    @GetMapping("/staff/customers/{id}")
    public ApiResponse<CustomerResponse> getById(@PathVariable Long id) {
        return new ApiResponse<>(
                "Get customer successfully",
                customerService.getById(id)
        );
    }

    // STAFF - delete
    @DeleteMapping("/staff/customers/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        customerService.delete(id);
        return new ApiResponse<>("Delete successfully", null);
    }

    // CUSTOMER - update own profile
    @PutMapping("/customer/profile")
    public ApiResponse<CustomerResponse> updateProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateCustomerRequest request) {

        String email = authentication.getName();

        CustomerResponse response =
                customerService.updateByEmail(email, request);

        return new ApiResponse<>("Update profile successfully", response);
    }

    @PutMapping("/staff/customers/{id}")
    public ApiResponse<CustomerResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateCustomerRequest request) {

        return new ApiResponse<>(
                "Update customer successfully",
                customerService.update(id, request)
        );
    }
}