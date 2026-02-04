-- 1. Insert Dữ liệu mẫu cho bảng SystemAccount
-- Role 1: Admin, Role 2: Staff
INSERT INTO system_account (account_name, account_email, account_role, account_password)
VALUES
    (N'Phong Admin', 'admin@funews.com.vn', 1, 'admin123'),
    (N'Nguyễn Văn Staff', 'staff01@funews.com.vn', 2, 'staff123'),
    (N'Lê Thị Staff', 'staff02@funews.com.vn', 2, 'staff123');

-- 2. Insert Dữ liệu mẫu cho bảng Category
-- isActive: 1 (True), 0 (False)
INSERT INTO Category (category_name, category_desciption, is_active, parent_categoryid)
VALUES
    (N'Thế giới', N'Tin tức quốc tế nổi bật', 1, NULL),
    (N'Công nghệ', N'Xu hướng công nghệ mới nhất', 1, NULL),
    (N'Đời sống', N'Tin tức xã hội và đời sống', 1, NULL),
    (N'Di động', N'Tin tức về Smartphone', 1, 2), -- Parent là Công nghệ (ID 2)
    (N'Phần mềm', N'Tin tức về ứng dụng và lập trình', 1, 2); -- Parent là Công nghệ (ID 2)

-- 3. Insert Dữ liệu mẫu cho bảng Tag
INSERT INTO Tag (tag_name, note)
VALUES
    ('AI', 'Artificial Intelligence'),
    ('Java', 'Backend development'),
    ('ReactJS', 'Frontend development'),
    ('Spring Boot', 'Framework Java'),
    ('Breaking News', 'Tin nong');

INSERT INTO news_article (news_title, headline, news_content, news_source, news_status, created_date, categoryid, created_byid )
VALUES
    (N'Ra mắt công nghệ AI mới', N'Trí tuệ nhân tạo đang thay đổi thế giới', N'Nội dung chi tiết về sự phát triển của AI trong năm 2026...', 'TechCrunch', 1, GETDATE(), 2, 2),
    (N'Lập trình Java với Spring Boot', N'Hướng dẫn cơ bản cho người mới bắt đầu', N'Spring Boot giúp việc tạo ứng dụng Java trở nên nhanh chóng...', 'Javaguides', 1, GETDATE(), 5, 2),
    (N'Tình hình kinh tế toàn cầu', N'Những chuyển biến mới trong đầu năm 2026', N'Dữ liệu chi tiết về thị trường chứng khoán và lạm phát...', 'Reuters', 1, GETDATE(), 1, 3);

