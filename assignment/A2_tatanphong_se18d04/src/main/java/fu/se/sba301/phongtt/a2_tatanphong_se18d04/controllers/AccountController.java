package fu.se.sba301.phongtt.a2_tatanphong_se18d04.controllers;

import fu.se.sba301.phongtt.a2_tatanphong_se18d04.pojos.SystemAccount;
import fu.se.sba301.phongtt.a2_tatanphong_se18d04.services.SystemAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {
    @Autowired
    private SystemAccountService accountService;

    @GetMapping
    public List<SystemAccount> getAll() {
        return accountService.getAllAccounts();
    }

    @PostMapping
    public SystemAccount create(@RequestBody SystemAccount account) {
        return accountService.saveAccount(account);
    }

    @PutMapping("/{id}")
    public SystemAccount update(@PathVariable Integer id, @RequestBody SystemAccount account) {
        account.setAccountID(id);
        return accountService.saveAccount(account);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        String result = accountService.deleteAccount(id);
        if (result.contains("Không thể xóa")) {
            return ResponseEntity.badRequest().body(result);
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/search")
    public List<SystemAccount> search(@RequestParam String keyword) {
        return accountService.searchAccounts(keyword);
    }
}