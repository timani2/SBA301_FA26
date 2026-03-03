package fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.repository;

import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CountryRepository extends JpaRepository<Country, Integer> {}