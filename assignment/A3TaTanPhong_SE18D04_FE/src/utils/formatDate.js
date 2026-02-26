/**
 * Hàm chuyển đổi định dạng ngày tháng
 * @param {string | Date} dateString - Chuỗi ngày tháng từ Backend (VD: '2026-12-31')
 * @returns {string} - Chuỗi ngày tháng định dạng dd/MM/yyyy
 */
export const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  // Lấy ngày, tháng, năm và thêm số 0 ở đầu nếu cần (VD: 5 -> 05)
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng trong JS bắt đầu từ 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

/**
 * Hàm tính số ngày giữa 2 mốc thời gian (Dùng để tính tổng tiền phòng)
 * @param {string} startDate - Ngày nhận phòng
 * @param {string} endDate - Ngày trả phòng
 * @returns {number} - Số ngày thuê
 */
export const calculateDaysBetween = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;

  const start = new Date(startDate);
  const end = new Date(endDate);

  // Tính khoảng cách bằng milliseconds
  const diffTime = Math.abs(end - start);

  // Chuyển đổi sang số ngày (1 ngày = 24 * 60 * 60 * 1000 ms)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays === 0 ? 1 : diffDays; // Thuê trong ngày tính là 1 ngày
};
