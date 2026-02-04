package fu.se.sba301.phongtt.a2_tatanphong_se18d04.services;

import fu.se.sba301.phongtt.a2_tatanphong_se18d04.pojos.SystemAccount;
import fu.se.sba301.phongtt.a2_tatanphong_se18d04.repositories.NewsArticleRepository;
import fu.se.sba301.phongtt.a2_tatanphong_se18d04.repositories.SystemAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SystemAccountService {
    @Autowired
    private SystemAccountRepository accountRepository;

    @Autowired
    private NewsArticleRepository newsArticleRepository;

    // Admin CRUD: Xem danh sách và tìm kiếm
    public List<SystemAccount> getAllAccounts() {
        return accountRepository.findAll();
    }

    // Logic Xóa tài khoản: Không được xóa nếu đã tạo bài viết

    public String deleteAccount(Integer id) {
        boolean hasNews = newsArticleRepository.existsByCreatedByAccountID(id);
        if (hasNews) {
            return "Không thể xóa: Tài khoản này đã tạo bài viết tin tức!";
        }
        accountRepository.deleteById(id);
        return "Xóa tài khoản thành công.";
    }

    public SystemAccount saveAccount(SystemAccount account) {
        return accountRepository.save(account);
    }

    public SystemAccount login(String email, String password) {
        // Tìm tài khoản theo email và kiểm tra mật khẩu
        return accountRepository.findByAccountEmail(email)
                .filter(acc -> acc.getAccountPassword().equals(password))
                .orElse(null);
    }

    public List<SystemAccount> searchAccounts(String keyword) {
        return accountRepository.findByAccountNameContainingOrAccountEmailContaining(keyword, keyword);
    }
}