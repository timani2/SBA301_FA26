/**
 * Định dạng ngày tháng từ Backend sang định dạng hiển thị VN (DD/MM/YYYY)
 * @param {string|Array} dateSource - Dữ liệu ngày từ Backend (ISO string hoặc Array [Y, M, D])
 * @returns {string} Chuỗi ngày đã định dạng
 */
export const formatDate = (dateSource) => {
  if (!dateSource) return "---";

  try {
    // Trường hợp Backend trả về mảng số [year, month, day] từ LocalDate (Java)
    if (Array.isArray(dateSource)) {
      const [year, month, day] = dateSource;
      const d = day.toString().padStart(2, "0");
      const m = month.toString().padStart(2, "0");
      return `${d}/${m}/${year}`;
    }

    // Trường hợp Backend trả về chuỗi ISO (ví dụ: "2026-03-05T00:00:00")
    const date = new Date(dateSource);

    // Kiểm tra tính hợp lệ của đối tượng Date
    if (isNaN(date.getTime())) return "Ngày không hợp lệ";

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error("Lỗi định dạng ngày:", error);
    return "Lỗi định dạng";
  }
};
