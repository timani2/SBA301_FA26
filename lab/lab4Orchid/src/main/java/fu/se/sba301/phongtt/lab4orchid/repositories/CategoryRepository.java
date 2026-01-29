package fu.se.sba301.phongtt.lab4orchid.repositories;

import fu.se.sba301.phongtt.lab4orchid.pojos.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}