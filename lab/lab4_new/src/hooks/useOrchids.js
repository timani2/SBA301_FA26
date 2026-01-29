import { useState, useEffect } from "react";
import { orchidService } from "../services/OrchidService";
import toast from "react-hot-toast";

export const useOrchids = () => {
  const [orchids, setOrchids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchOrchids = async () => {
    setLoading(true);
    try {
      const res = await orchidService.getAll();
      // Sắp xếp dữ liệu nhận được
      setOrchids(res.data.sort((a, b) => b.id - a.id));
    } catch (err) {
      toast.error("Lỗi khi tải dữ liệu!");
    } finally {
      setLoading(false);
    }
  };

  const deleteOrchid = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa Orchid này?")) return;
    try {
      await orchidService.delete(id);
      toast.success("Xóa thành công!");
      fetchOrchids();
    } catch (err) {
      toast.error("Xóa thất bại!");
    }
  };

  useEffect(() => {
    fetchOrchids();
  }, []);

  return {
    orchids,
    loading,
    deleteOrchid,
    fetchOrchids,
    showModal,
    setShowModal,
  };
};
