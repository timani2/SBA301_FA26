package fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770;


import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.entity.AccountMember;
import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.entity.Cars;
import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.entity.Country;
import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.repository.CarRepository;
import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.repository.CountryRepository;
import fu.se.sba301.phongtt.pe_sba301_sp25_be_de180770.repository.MemberRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    private final MemberRepository memberRepo;
    private final CountryRepository countryRepo;
    private final CarRepository carRepo;
    private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

    public DataInitializer(MemberRepository memberRepo, CountryRepository countryRepo, CarRepository carRepo) {
        this.memberRepo = memberRepo;
        this.countryRepo = countryRepo;
        this.carRepo = carRepo;
    }

    @Override
    public void run(String... args) throws Exception {
        // 1. Nạp dữ liệu bảng Country [cite: 50]
        if (countryRepo.count() == 0) {
            Country japan = new Country(); japan.setCountryName("Japan");
            Country usa = new Country(); usa.setCountryName("USA");
            Country france = new Country(); france.setCountryName("France");
            Country germany = new Country(); germany.setCountryName("Germany");
            countryRepo.saveAll(Arrays.asList(japan, usa, france, germany));
        }

        // 2. Nạp dữ liệu bảng AccountMember
        if (memberRepo.count() == 0) {
            AccountMember admin = new AccountMember();
            admin.setMemberID("PS0001"); admin.setMemberPassword("@1");
            admin.setEmailAddress("admin@cinestar.com"); admin.setMemberRole(1);

            AccountMember staff = new AccountMember();
            staff.setMemberID("PS0002"); staff.setMemberPassword("@2");
            staff.setEmailAddress("staff@cinestar.com"); staff.setMemberRole(2);

            AccountMember member1 = new AccountMember();
            member1.setMemberID("PS0003"); member1.setMemberPassword("@3");
            member1.setEmailAddress("member1@cinestar.com"); member1.setMemberRole(3);

            AccountMember member2 = new AccountMember();
            member2.setMemberID("PS0004"); member2.setMemberPassword("@3");
            member2.setEmailAddress("member2@cinestar.com"); member2.setMemberRole(3);

            memberRepo.saveAll(Arrays.asList(admin, staff, member1, member2));
        }

        // 3. Nạp dữ liệu bảng Cars
        if (carRepo.count() == 0) {
            Country japan = countryRepo.findAll().get(0); // Japan
            Country usa = countryRepo.findAll().get(1);   // USA
            Country france = countryRepo.findAll().get(2); // France
            Country germany = countryRepo.findAll().get(3); // Germany

            carRepo.save(createCar("Honda CV", japan, 12, 18000, "2025-01-01", "2025-01-02"));
            carRepo.save(createCar("Camry", japan, 23, 19000, "2025-01-01", "2025-01-02"));
            carRepo.save(createCar("Mercedes", germany, 10, 35000, "2025-01-01", "2025-01-02"));
            carRepo.save(createCar("Ford Everest", usa, 20, 40000, "2025-01-01", "2025-01-02"));
            carRepo.save(createCar("Lexus", usa, 10, 90000, "2025-01-01", "2025-01-01"));
            carRepo.save(createCar("Peugeot 3008", france, 10, 91000, "2025-01-01", "2025-01-01"));
        }
    }

    private Cars createCar(String name, Country country, int stock, int price, String created, String updated) throws Exception {
        Cars car = new Cars();
        car.setCarName(name);
        car.setCountry(country);
        car.setUnitsInStock((short) stock);
        car.setUnitPrice(price);
        car.setCreatedAt(dateFormat.parse(created));
        car.setUpdatedAt(dateFormat.parse(updated));
        return car;
    }
}