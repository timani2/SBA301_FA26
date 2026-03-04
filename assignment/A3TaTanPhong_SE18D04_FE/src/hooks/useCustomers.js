import { useState, useCallback } from "react";
import { customerService } from "../services/customerService";
import { toast } from "react-toastify";

export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await customerService.getAllCustomers();
      setCustomers(res.data || []);
    } catch (error) {
      console.error("Fetch customers error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCustomer = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) return;
    try {
      const res = await customerService.deleteCustomer(id);
      toast.success(res.message || "Xóa thành công");
      fetchAllCustomers();
    } catch (error) {
      // api.js đã handle toast lỗi
    }
  };

  const updateProfile = async (data) => {
    try {
      const res = await customerService.updateMyProfile(data);
      toast.success(res.message || "Cập nhật thành công");
      return res.data;
    } catch (error) {
      return null;
    }
  };

  return {
    customers,
    loading,
    fetchAllCustomers,
    deleteCustomer,
    updateProfile,
  };
};
