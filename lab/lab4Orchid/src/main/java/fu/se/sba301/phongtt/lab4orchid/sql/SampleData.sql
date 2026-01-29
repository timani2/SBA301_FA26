
USE Orchid;
GO
-- Dữ liệu cho Lan Hồ Điệp (Category 1)
INSERT INTO orchid
(orchid_name, is_natural, price, orchid_description, is_attractive, orchid_url, category_id)
VALUES
    (
        N'Hồ Điệp Tím Đà Lạt',
        0,
        350000,
        N'Hoa có màu tím đậm, cánh dày, lâu tàn, phù hợp biếu tặng.',
        1,
        'https://example.com/tim-da-lat.jpg',
        1
    );

INSERT INTO orchid
(orchid_name, is_natural, price, orchid_description, is_attractive, orchid_url, category_id)
VALUES
    (
        N'Hoàng Thảo Kèn',
        1,
        1200000,
        N'Loài lan rừng quý hiếm với hương thơm đặc trưng và sắc tím quyến rũ.',
        1,
        'https://example.com/hoang-thao-ken.jpg',
        2
    );

INSERT INTO orchid
(orchid_name, is_natural, price, orchid_description, is_attractive, orchid_url, category_id)
VALUES
    (
        N'Kiếm Tiên Vũ',
        1,
        850000,
        N'Lá bản to, hoa mọc thành chùm dài màu vàng xanh.',
        0,
        'https://example.com/kiem-tien-vu.jpg',
        3
    );


INSERT INTO category (category_name) VALUES (N'Dendrobium');
INSERT INTO category (category_name) VALUES (N'Phalaenopsis');
INSERT INTO category (category_name) VALUES (N'Cattleya');
INSERT INTO category (category_name) VALUES (N'Vanda');