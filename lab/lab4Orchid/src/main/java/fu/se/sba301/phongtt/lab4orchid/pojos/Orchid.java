package fu.se.sba301.phongtt.lab4orchid.pojos;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
@Getter
@Setter
@Entity
@JsonPropertyOrder({ "orchidID", "orchidName", "isNatural", "orchidDescription", "orchidCategory", "isAttractive", "orchidURL" })
public class Orchid implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orchid_id")
    private int orchidID;

    // Sử dụng nvarchar(255) để hỗ trợ tiếng Việt
    @Column(name = "orchid_name", columnDefinition = "nvarchar(255)")
    private String orchidName;

    @Column(name = "is_natural", columnDefinition = "bit default 0")
    private boolean isNatural;

    // Sử dụng nvarchar(max) cho các đoạn mô tả dài
    @Column(name = "orchid_description", columnDefinition = "nvarchar(max)")
    private String orchidDescription;

    @ManyToOne
    @JoinColumn(name = "category_id") // Khóa ngoại liên kết sang bảng category
    private Category orchidCategory;

    @Column(name = "is_attractive", columnDefinition = "bit default 0")
    private boolean isAttractive;

    @Column(name = "orchid_url", columnDefinition = "nvarchar(max)")
    private String orchidURL;
}