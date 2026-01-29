package fu.se.sba301.phongtt.lab4orchid.pojos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "category")
public class Category implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private int categoryID;

    @Column(name = "category_name", columnDefinition = "nvarchar(255)")
    private String categoryName;

    // Sửa mappedBy thành "orchidCategory" để khớp với biến bên lớp Orchid
    @OneToMany(mappedBy = "orchidCategory", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Orchid> orchids;
}