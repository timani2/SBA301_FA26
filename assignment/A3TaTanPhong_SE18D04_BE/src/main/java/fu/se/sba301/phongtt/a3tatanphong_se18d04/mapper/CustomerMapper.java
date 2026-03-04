package fu.se.sba301.phongtt.a3tatanphong_se18d04.mapper;


import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request.RegisterRequest;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request.UpdateCustomerRequest;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response.CustomerResponse;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.Customer;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.enums.Role;

public class CustomerMapper {

    public static Customer toEntity(RegisterRequest request) {
        return Customer.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .address(request.getAddress())
                .role(Role.ROLE_CUSTOMER) // mặc định khi register
                .build();
    }

    public static CustomerResponse toResponse(Customer customer) {
        return new CustomerResponse(
                customer.getCustomerId(),
                customer.getFullName(),
                customer.getEmail(),
                customer.getPhone(),
                customer.getAddress(),
                customer.getRole().name()
        );
    }

    public static void updateEntity(Customer customer, UpdateCustomerRequest request) {
        customer.setFullName(request.getFullName());
        customer.setPhone(request.getPhone());
        customer.setAddress(request.getAddress());
    }
}