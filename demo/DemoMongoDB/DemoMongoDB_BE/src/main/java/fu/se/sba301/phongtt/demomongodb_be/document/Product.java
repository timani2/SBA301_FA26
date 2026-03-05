package fu.se.sba301.phongtt.demomongodb_be.document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "inventory")
public class Product {

    @Id
    private String id;

    private String name;
    private String category;
    private String brand;
    private Double price;

    private Details details;

    private List<Review> reviews;

    private Integer stock;

    @Data
    public static class Details {

        private Specs specs;

        private List<String> colors;

        private Warranty warranty;
    }

    @Data
    public static class Specs {

        private String cpu;
        private String ram;
        private String storage;
        private String screen;
        private String camera;
        private List<String> ports;
        private String type;
        private Boolean noise_cancelling;
        private String battery;
    }

    @Data
    public static class Warranty {

        private String period;
        private String type;
    }

    @Data
    public static class Review {

        private String user;
        private Integer rating;
        private String comment;
    }
}