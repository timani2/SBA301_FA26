package fu.se.sba301.phongtt.demomongodb_be.service;



import fu.se.sba301.phongtt.demomongodb_be.document.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final fu.se.sba301.phongtt.demomongodb_be.repository.ProductRepository productRepository;

    // GET ALL
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // GET BY ID
    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    // CREATE
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    // UPDATE
    public Product updateProduct(String id, Product product) {
        product.setId(id);
        return productRepository.save(product);
    }

    // DELETE
    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    // FIND BY BRAND
    public List<Product> getByBrand(String brand) {
        return productRepository.findByBrand(brand);
    }

    // FIND BY CATEGORY
    public List<Product> getByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    // FIND BY PRICE RANGE
    public List<Product> getByPriceRange(Double min, Double max) {
        return productRepository.findByPriceBetween(min, max);
    }
}