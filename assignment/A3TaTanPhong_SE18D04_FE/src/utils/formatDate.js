/**
 * Chuyển đổi dữ liệu từ Backend (Mảng [Y,M,D] hoặc Chuỗi ISO) thành đối tượng Date của JS
 */
export const parseDateFromBackend = (dateVal) => {
  if (!dateVal) return null;

  // Trường hợp Backend trả về mảng số từ LocalDate
  if (Array.isArray(dateVal)) {
    return new Date(dateVal[0], dateVal[1] - 1, dateVal[2]);
  }

  // Trường hợp trả về chuỗi yyyy-MM-dd
  if (typeof dateVal === "string" && dateVal.length === 10) {
    const [year, month, day] = dateVal.split("-");
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  const date = new Date(dateVal);
  return isNaN(date.getTime()) ? null : date;
};

/**
 * Chuyển đổi đối tượng Date thành chuỗi yyyy-MM-dd để gửi về Backend
 */
export const formatDateForBackend = (date) => {
  if (!date || isNaN(date.getTime())) return null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/**
 * Định dạng hiển thị kiểu Việt Nam (dd/mm/yyyy) dùng cho các bảng danh sách
 */
export const formatDate = (dateVal) => {
  const date = parseDateFromBackend(dateVal);
  if (!date) return "Chưa cập nhật";
  return date.toLocaleDateString("vi-VN");
};
