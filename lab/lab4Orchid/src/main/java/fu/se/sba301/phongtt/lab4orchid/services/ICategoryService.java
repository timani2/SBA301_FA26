package fu.se.sba301.phongtt.lab4orchid.services;

import fu.se.sba301.phongtt.lab4orchid.pojos.Category;
import java.util.List;

public interface ICategoryService {
    List<Category> getAllCategories();
    Category saveCategory(Category category);
}