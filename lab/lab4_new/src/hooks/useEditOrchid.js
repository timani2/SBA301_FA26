import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { orchidService } from "../services/OrchidService";
import toast from "react-hot-toast";

export const useEditOrchid = (id) => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (id) {
      orchidService
        .getById(id)
        .then((res) => {
          // Đổ dữ liệu vào Form
          setValue("orchidName", res.data.orchidName);
          setValue("image", res.data.image);
          setValue("isNatural", res.data.isNatural);
        })
        .catch(() => toast.error("Không tìm thấy dữ liệu!"));
    }
  }, [id, setValue]);

  const onUpdate = async (data) => {
    try {
      await orchidService.update(id, data);
      toast.success("Cập nhật thành công!");
      navigate("/"); // Quay lại trang danh sách [cite: 96]
    } catch (err) {
      toast.error("Cập nhật thất bại!");
    }
  };

  return { register, handleSubmit, onUpdate, navigate };
};
