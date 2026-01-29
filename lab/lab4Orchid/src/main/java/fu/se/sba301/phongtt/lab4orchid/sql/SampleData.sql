
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
        'https://gcs.tripi.vn/public-tripi/tripi-feed/img/473672qrs/lan-ho-diep-581636.jpg',
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
        'https://cdn.baogialai.com.vn/images/5d93661b5836672daa8629aec90c6a0bf29981863b3d88bcfd583a2b12f4cdcf41f8da2f0c7e0fc4e23a539a1710ce3761a472d90163de8f00451a256d2a57bb/images2542587_h_1.jpg',
        2
    );

INSERT INTO orchid
(orchid_name, is_natural, price, orchid_description, is_attractive, orchid_url, category_id)
VALUES
    (
        N'Kiếm Tiên Vũ',
        1,
        850000,
        N'https://xenangphuy.com/wp-content/uploads/lan-dep.jpg',
        0,
        'https://example.com/kiem-tien-vu.jpg',
        3
    );


INSERT INTO category (category_name) VALUES (N'Dendrobium');
INSERT INTO category (category_name) VALUES (N'Phalaenopsis');
INSERT INTO category (category_name) VALUES (N'Cattleya');
INSERT INTO category (category_name) VALUES (N'Vanda');