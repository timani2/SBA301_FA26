import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { customerService } from "../services/customerService";

export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Staff: Lấy danh sách toàn bộ khách hàng
  const fetchAllCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await customerService.getAllCustomers();
      setCustomers(data);
    } catch (error) {
      console.error("Lỗi tải danh sách khách hàng:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Customer/Staff: Cập nhật Profile
  const updateProfile = async (id, customerData) => {
    setLoading(true);
    try {
      await customerService.updateProfile(id, customerData);
      toast.success("Cập nhật thông tin thành công!");

      // Nếu là Staff đang sửa trong bảng Manage, update lại state cục bộ
      setCustomers((prev) =>
        prev.map((c) => (c.customerId === id ? { ...c, ...customerData } : c)),
      );

      return true;
    } catch (error) {
      console.error("Lỗi cập nhật thông tin:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { customers, loading, fetchAllCustomers, updateProfile };
};
