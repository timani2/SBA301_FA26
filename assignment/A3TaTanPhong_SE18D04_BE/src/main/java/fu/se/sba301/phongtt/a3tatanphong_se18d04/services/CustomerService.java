package fu.se.sba301.phongtt.a3tatanphong_se18d04.services;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request.UpdateCustomerRequest;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response.CustomerResponse;

import java.util.List;

public interface CustomerService {

    List<CustomerResponse> getAll();

    CustomerResponse getById(Long id);

    CustomerResponse update(Long id, UpdateCustomerRequest request);

    void delete(Long id);

    CustomerResponse updateByEmail(String email, UpdateCustomerRequest request);
}