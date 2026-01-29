package fu.se.sba301.phongtt.lab4orchid.pojos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;

@Getter
@Setter
@Entity
@JsonPropertyOrder({
        "orchidID", "orchidName", "isNatural",
        "orchidDescription", "orchidCategory",
        "isAttractive", "orchidURL"
})

public class Orchid implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orchid_id")
    private int orchidID;

    // Sử dụng nvarchar(255) để hỗ trợ tiếng Việt
    @Column(name = "orchid_name", columnDefinition = "nvarchar(255)")
    private String orchidName;


    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price = BigDecimal.ZERO;

    // Sử dụng nvarchar(max) cho các đoạn mô tả dài
    @Column(name = "orchid_description", columnDefinition = "nvarchar(max)")
    private String orchidDescription;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category orchidCategory;


    @Column(name = "is_natural", columnDefinition = "bit default 0")
    private Boolean isNatural;

    @Column(name = "is_attractive", columnDefinition = "bit default 0")
    private Boolean isAttractive;

    @Column(name = "orchid_url", columnDefinition = "nvarchar(max)")
    private String orchidURL;
}