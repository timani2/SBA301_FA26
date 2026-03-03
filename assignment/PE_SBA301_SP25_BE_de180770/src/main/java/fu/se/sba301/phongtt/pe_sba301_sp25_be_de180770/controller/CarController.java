package fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.controller;

import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.dto.CarDTO;
import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.entity.Cars;
import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin("*")
public class CarController {

    @Autowired
    private CarService carService;

    // Task 2: List all cars (No permissions required)
    @GetMapping
    public ResponseEntity<List<CarDTO>> getAllCars() {
        return ResponseEntity.ok(carService.getAllCars());
    }

    // Task 2: Add new item (Check Admin role = 1)
    @PostMapping
    @PreAuthorize("hasAuthority('1')") // Chỉ Admin mới có quyền thực hiện
    public ResponseEntity<?> createCar(@RequestBody Cars car) {
        try {
            Cars savedCar = carService.addCar(car);
            return ResponseEntity.ok(savedCar);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Task 2: Delete selected item (Check Admin role = 1)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('1')") // Xác thực quyền Admin trước khi xóa
    public ResponseEntity<?> deleteCar(@PathVariable Integer id) {
        try {
            carService.deleteCar(id);
            return ResponseEntity.ok("Car deleted successfully with ID: " + id);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}