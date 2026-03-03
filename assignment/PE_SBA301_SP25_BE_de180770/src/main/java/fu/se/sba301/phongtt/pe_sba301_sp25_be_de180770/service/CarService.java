package fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.service;

import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.dto.CarDTO;

import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.entity.Cars;
import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarService {
    @Autowired private CarRepository carRepository;

    // Task 2: List all cars - Item mới ở trên cùng [cite: 21, 24]
    public List<CarDTO> getAllCars() {
        // Sắp xếp giảm dần theo ID để item mới nhất hiển thị ở đầu danh sách
        return carRepository.findAll(Sort.by(Sort.Direction.DESC, "carID")).stream()
                .map(car -> new CarDTO(
                        car.getCarID(),
                        car.getCarName(),
                        car.getUnitsInStock(),
                        car.getUnitPrice(),
                        car.getCountry().getCountryName(), // Lấy CountryName từ bảng Country [cite: 39]
                        car.getCreatedAt(),
                        car.getUpdatedAt()
                )).collect(Collectors.toList());
    }

    // Task 2: Add new item với 5 ràng buộc
    public Cars addCar(Cars car) {
        // 1. Tất cả các trường là bắt buộc [cite: 25]
        if (car.getCarName() == null || car.getUnitsInStock() == null || car.getCountry() == null) {
            throw new RuntimeException("All fields are required.");
        }

        // 2. CarName > 10 ký tự
        if (car.getCarName().length() <= 10) {
            throw new RuntimeException("CarName must be greater than 10 characters.");
        }

        // 3. UnitsInStock trong khoảng 5 đến 20
        if (car.getUnitsInStock() < 5 || car.getUnitsInStock() > 20) {
            throw new RuntimeException("UnitsInStock must be >= 5 and <= 20.");
        }

        // 4. CreatedAt = CurrentDate
        car.setCreatedAt(new Date());

        // 5. CreatedAt <= UpdatedAt
        if (car.getUpdatedAt() != null && car.getCreatedAt().after(car.getUpdatedAt())) {
            throw new RuntimeException("CreatedAt must be less than or equal to UpdatedAt.");
        }

        return carRepository.save(car);
    }

    // Task 2: Delete item [cite: 22]
    public void deleteCar(Integer id) {
        if (!carRepository.existsById(id)) {
            throw new RuntimeException("Car not found");
        }
        carRepository.deleteById(id);
    }
}