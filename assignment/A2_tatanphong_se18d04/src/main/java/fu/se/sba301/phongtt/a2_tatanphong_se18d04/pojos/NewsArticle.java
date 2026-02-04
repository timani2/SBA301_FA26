package fu.se.sba301.phongtt.a2_tatanphong_se18d04.pojos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "NewsArticle")
@Data
public class NewsArticle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer newsArticleID;

    @Column(nullable = false, columnDefinition = "NVARCHAR(400)")
    private String newsTitle;

    @Column(columnDefinition = "NVARCHAR(400)")
    private String headline;

    private LocalDateTime createdDate;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String newsContent;

    @Column(columnDefinition = "NVARCHAR(255)")
    private String newsSource;

    @ManyToOne
    @JoinColumn(name = "CategoryID")
    private Category category;

    private Integer newsStatus; // active(1)/inactive(0)

    @ManyToOne
    @JoinColumn(name = "CreatedByID")
    private SystemAccount createdBy;

    @ManyToMany
    @JoinTable(
            name = "NewsTag",
            joinColumns = @JoinColumn(name = "NewsArticleID"),
            inverseJoinColumns = @JoinColumn(name = "TagID")
    )
    private Set<Tag> tags;
}