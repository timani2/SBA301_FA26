package fu.se.sba301.phongtt.a3tatanphong_se18d04.services.impl;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request.UpdateCustomerRequest;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response.CustomerResponse;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.Customer;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.exception.AppException;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.exception.ErrorCode;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.mapper.CustomerMapper;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.reposirories.CustomerRepository;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    @Override
    public List<CustomerResponse> getAll() {
        return customerRepository.findAll()
                .stream()
                .map(CustomerMapper::toResponse)
                .toList();
    }

    @Override
    public CustomerResponse getById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_NOT_FOUND));

        return CustomerMapper.toResponse(customer);
    }

    @Override
    public CustomerResponse update(Long id, UpdateCustomerRequest request) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_NOT_FOUND));

        CustomerMapper.updateEntity(customer, request);

        customerRepository.save(customer);

        return CustomerMapper.toResponse(customer);
    }

    @Override
    public void delete(Long id) {
        customerRepository.deleteById(id);
    }

    @Override
    public CustomerResponse updateByEmail(String email,
                                          UpdateCustomerRequest request) {

        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_NOT_FOUND));

        CustomerMapper.updateEntity(customer, request);

        customerRepository.save(customer);

        return CustomerMapper.toResponse(customer);
    }

    @Override
    public CustomerResponse getByEmail(String email) {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.CUSTOMER_NOT_FOUND));
        return CustomerMapper.toResponse(customer);
    }
}