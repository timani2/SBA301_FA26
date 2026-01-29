package fu.se.sba301.phongtt.lab4orchid.services;

import fu.se.sba301.phongtt.lab4orchid.pojos.Category;

import fu.se.sba301.phongtt.lab4orchid.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryService implements ICategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }
}