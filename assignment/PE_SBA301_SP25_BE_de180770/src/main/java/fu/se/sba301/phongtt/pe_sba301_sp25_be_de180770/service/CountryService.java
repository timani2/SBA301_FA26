package fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.service;

import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.entity.Country;
import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CountryService {
    @Autowired
    private CountryRepository countryRepository;

    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }
}