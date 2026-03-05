package fu.se.sba301.phongtt.demomongodb_be.repository;



import fu.se.sba301.phongtt.demomongodb_be.document.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {

    // tìm theo brand
    List<fu.se.sba301.phongtt.demomongodb_be.document.Product> findByBrand(String brand);

    // tìm theo category
    List<Product> findByCategory(String category);

    // tìm theo khoảng giá
    List<Product> findByPriceBetween(Double min, Double max);

}