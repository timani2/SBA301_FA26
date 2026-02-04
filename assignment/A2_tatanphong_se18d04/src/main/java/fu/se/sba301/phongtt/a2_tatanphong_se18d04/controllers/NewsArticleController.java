package fu.se.sba301.phongtt.a2_tatanphong_se18d04.controllers;


import fu.se.sba301.phongtt.a2_tatanphong_se18d04.pojos.NewsArticle;
import fu.se.sba301.phongtt.a2_tatanphong_se18d04.pojos.SystemAccount;
import fu.se.sba301.phongtt.a2_tatanphong_se18d04.services.NewsArticleService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
public class NewsArticleController {
    @Autowired
    private NewsArticleService newsService;
    @Autowired
    private NewsArticleService newsArticleService;

    // Public: Xem tin tức đang hoạt động (không cần login)
    @GetMapping("/active")
    public List<NewsArticle> getActiveNews() {
        return newsService.getActiveNews();
    }

    // Staff: Xem lịch sử bài viết của mình
    @GetMapping("/history/{staffId}")
    public List<NewsArticle> getMyHistory(@PathVariable Integer staffId) {
        return newsService.getMyNewsHistory(staffId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NewsArticle> updateNews(@PathVariable Integer id, @RequestBody NewsArticle news) {
        try {
            NewsArticle result = newsArticleService.updateNews(id, news);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping
    public NewsArticle create(@RequestBody NewsArticle article) {
        return newsService.createNews(article);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        newsService.deleteNews(id);
    }

    @GetMapping("/search")
    public List<NewsArticle> search(@RequestParam String keyword) {
        return newsService.searchNews(keyword);
    }
}