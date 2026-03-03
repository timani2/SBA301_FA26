package fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.controller;

import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.entity.Country;
import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/countries")
public class CountryController {

    @Autowired
    private CountryService countryService;

    @GetMapping
    public ResponseEntity<List<Country>> getAllCountries() {
        return ResponseEntity.ok(countryService.getAllCountries());
    }
}