package fu.se.sba301.phongtt.a2_tatanphong_se18d04.services;

import fu.se.sba301.phongtt.a2_tatanphong_se18d04.pojos.NewsArticle;
import fu.se.sba301.phongtt.a2_tatanphong_se18d04.repositories.NewsArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NewsArticleService {
    @Autowired
    private NewsArticleRepository newsArticleRepository;


    public List<NewsArticle> getActiveNews() {
        return newsArticleRepository.findByNewsStatus(1);
    }


    public List<NewsArticle> getMyNewsHistory(Integer staffId) {
        return newsArticleRepository.findByCreatedByAccountID(staffId);
    }


    public NewsArticle createNews(NewsArticle article) {
        article.setCreatedDate(LocalDateTime.now());
        article.setCreatedBy(article.getCreatedBy());
        return newsArticleRepository.save(article);
    }

    public void deleteNews(Integer id) {
        newsArticleRepository.deleteById(id);
    }

    public List<NewsArticle> searchNews(String keyword) {
        return newsArticleRepository.findByNewsTitleContainingOrHeadlineContaining(keyword, keyword);
    }

    public NewsArticle updateNews(Integer id, NewsArticle updatedNews) {
        // 1. Kiểm tra bài viết có tồn tại không
        return newsArticleRepository.findById(id).map(existingNews -> {
            // 2. Cập nhật các trường dữ liệu
            existingNews.setNewsTitle(updatedNews.getNewsTitle());
            existingNews.setHeadline(updatedNews.getHeadline());
            existingNews.setNewsContent(updatedNews.getNewsContent());
            existingNews.setNewsSource(updatedNews.getNewsSource());
            existingNews.setNewsStatus(updatedNews.getNewsStatus());
            existingNews.setCategory(updatedNews.getCategory());
            existingNews.setTags(updatedNews.getTags());
            // Không cập nhật createdDate và createdBy để giữ nguyên lịch sử gốc

            return newsArticleRepository.save(existingNews);
        }).orElseThrow(() -> new RuntimeException("Không tìm thấy bài viết với ID: " + id));
    }
}