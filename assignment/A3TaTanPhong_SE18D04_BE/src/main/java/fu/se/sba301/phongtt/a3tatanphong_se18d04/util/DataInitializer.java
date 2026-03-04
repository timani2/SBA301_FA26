package fu.se.sba301.phongtt.a3tatanphong_se18d04.util;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.*;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.enums.*;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.reposirories.*;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer {

    private final CustomerRepository customerRepository;
    private final RoomTypeRepository roomTypeRepository;
    private final RoomRepository roomRepository;
    private final BookingRepository bookingRepository;
    private final BookingDetailRepository bookingDetailRepository;

    private final PasswordEncoder passwordEncoder;

    @Value("${app.staff.email}")
    private String staffEmail;

    @Value("${app.staff.password}")
    private String staffPassword;

    @PostConstruct
    public void initData() {

        initStaff();
        initRoomTypes();
        initRooms();
        initCustomers();
        initSampleBooking();
    }

    // ================= STAFF =================

    private void initStaff() {
        if (!customerRepository.existsByEmail(staffEmail)) {

            Customer staff = Customer.builder()
                    .email(staffEmail)
                    .password(passwordEncoder.encode(staffPassword))
                    .fullName("System Admin")
                    .role(Role.ROLE_STAFF)
                    .build();

            customerRepository.save(staff);
        }
    }

    // ================= ROOM TYPE =================

    private void initRoomTypes() {

        if (roomTypeRepository.count() > 0) return;

        RoomType standard = RoomType.builder()
                .name("Standard")
                .description("Standard Room")
                .price(500_000.0)
                .build();

        RoomType deluxe = RoomType.builder()
                .name("Deluxe")
                .description("Deluxe Room")
                .price(800_000.0)
                .build();

        RoomType vip = RoomType.builder()
                .name("VIP")
                .description("VIP Room")
                .price(1_500_000.0)
                .build();

        roomTypeRepository.saveAll(List.of(standard, deluxe, vip));
    }

    // ================= ROOMS =================

    private void initRooms() {

        if (roomRepository.count() > 0) return;

        List<RoomType> types = roomTypeRepository.findAll();

        for (int i = 1; i <= 3; i++) {
            roomRepository.save(RoomInformation.builder()
                    .roomNumber("S10" + i)
                    .roomType(types.get(0))
                    .status(RoomStatus.AVAILABLE)
                    .build());
        }

        for (int i = 1; i <= 3; i++) {
            roomRepository.save(RoomInformation.builder()
                    .roomNumber("D20" + i)
                    .roomType(types.get(1))
                    .status(RoomStatus.AVAILABLE)
                    .build());
        }

        for (int i = 1; i <= 2; i++) {
            roomRepository.save(RoomInformation.builder()
                    .roomNumber("V30" + i)
                    .roomType(types.get(2))
                    .status(RoomStatus.AVAILABLE)
                    .build());
        }
    }

    // ================= SAMPLE CUSTOMERS =================

    private void initCustomers() {

        if (customerRepository.existsByEmail("customer1@gmail.com")) return;

        Customer c1 = Customer.builder()
                .email("customer1@gmail.com")
                .password(passwordEncoder.encode("123456"))
                .fullName("Nguyen Van A")
                .role(Role.ROLE_CUSTOMER)
                .build();

        Customer c2 = Customer.builder()
                .email("customer2@gmail.com")
                .password(passwordEncoder.encode("123456"))
                .fullName("Tran Thi B")
                .role(Role.ROLE_CUSTOMER)
                .build();

        customerRepository.saveAll(List.of(c1, c2));
    }

    // ================= SAMPLE BOOKING =================

    private void initSampleBooking() {

        if (bookingRepository.count() > 0) return;

        Customer customer = customerRepository
                .findByEmail("customer1@gmail.com")
                .orElse(null);

        if (customer == null) return;

        List<RoomInformation> rooms = roomRepository.findAll();

        BookingReservation booking = BookingReservation.builder()
                .bookingDate(LocalDate.now())
                .checkInDate(LocalDate.now().plusDays(1))
                .checkOutDate(LocalDate.now().plusDays(3))
                .status(BookingStatus.CONFIRMED)
                .customer(customer)
                .build();

        bookingRepository.save(booking);

        double total = 0;

        for (int i = 0; i < 2; i++) {
            RoomInformation room = rooms.get(i);

            BookingDetail detail = BookingDetail.builder()
                    .booking(booking)
                    .room(room)
                    .priceAtBooking(room.getRoomType().getPrice())
                    .build();

            bookingDetailRepository.save(detail);

            total += detail.getPriceAtBooking();
        }

        booking.setTotalAmount(total);
        bookingRepository.save(booking);
    }
}