package fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.repository;

import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.entity.AccountMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<AccountMember, String> {
    Optional<AccountMember> findByEmailAddress(String email);
}
