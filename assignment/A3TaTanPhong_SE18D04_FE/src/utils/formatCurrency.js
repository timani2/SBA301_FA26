/**
 * Hàm định dạng số tiền thành chuỗi tiền tệ VNĐ hoặc USD
 * @param {number} amount - Số tiền cần định dạng
 * @param {string} currency - 'VND' hoặc 'USD' (Mặc định là USD)
 * @returns {string} - Chuỗi đã định dạng
 */
export const formatCurrency = (amount, currency = "USD") => {
  if (amount === null || amount === undefined) return "";

  if (currency === "VND") {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }

  // Mặc định là USD theo form khách sạn quốc tế
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};
