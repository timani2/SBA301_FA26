/**
 * Định dạng số thành chuỗi tiền tệ VND
 * @param {number|string} amount - Giá trị số từ Backend (roomPricePerDay, actualPrice, ...)
 * @returns {string} Chuỗi tiền tệ (ví dụ: 500.000 ₫)
 */
export const formatCurrency = (amount) => {
  // Xử lý các giá trị không hợp lệ
  if (amount === undefined || amount === null || isNaN(amount)) {
    return "0 ₫";
  }

  try {
    // Sử dụng thư viện Intl chuẩn của trình duyệt để định dạng theo locale VN
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  } catch (error) {
    console.error("Lỗi định dạng tiền tệ:", error);
    return amount + " VND";
  }
};
