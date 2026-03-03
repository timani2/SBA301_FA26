import { useEffect, useState } from "react";
import carService from "../services/carService";
import authService from "../services/authService";

export default function useCarTableLogic() {
  const [cars, setCars] = useState([]);
  const [countries, setCountries] = useState([]);
  const userRole = authService.getCurrentUserRole();

  const [showEditModal, setShowEditModal] = useState(false);
  const [editCarData, setEditCarData] = useState({
    carID: null,
    carName: "",
    unitsInStock: 5,
    unitPrice: 0,
    country: { countryID: "" },
  });
  const [editError, setEditError] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCarID, setDeleteCarID] = useState(null);
  const [deleteCarName, setDeleteCarName] = useState("");
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    fetchCars();
    fetchCountries();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await carService.getAllCars();
      setCars(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCountries = async () => {
    try {
      const res = await carService.getAllCountries();
      const normalized = (res.data || []).map((c) => ({
        ...c,
        countryID: c.countryID != null ? String(c.countryID) : "",
      }));
      setCountries(normalized);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (car) => {
    const rawCid =
      car.countryID ?? (car.country && car.country.countryID) ?? "";
    setEditCarData({
      carID: car.carID,
      carName: car.carName,
      unitsInStock: car.unitsInStock,
      unitPrice: car.unitPrice,
      country: { countryID: String(rawCid) },
    });
    setEditError("");
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    if (editCarData.carName.length <= 10)
      return setEditError("Car Name > 10 characters.");
    try {
      await carService.updateCar(editCarData.carID, editCarData);
      setShowEditModal(false);
      fetchCars();
    } catch (err) {
      setEditError("Update failed.");
    }
  };

  const handleDeleteClick = (car) => {
    setDeleteCarID(car.carID);
    setDeleteCarName(car.carName);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await carService.deleteCar(deleteCarID);
      setShowDeleteModal(false);
      fetchCars();
    } catch (err) {
      setDeleteError("Delete failed.");
    }
  };

  const closeEditModal = () => setShowEditModal(false);
  const closeDeleteModal = () => setShowDeleteModal(false);

  return {
    cars,
    countries,
    userRole,
    showEditModal,
    editCarData,
    setEditCarData,
    editError,
    handleEditClick,
    handleEditSubmit,
    showDeleteModal,
    deleteCarName,
    deleteError,
    handleDeleteClick,
    handleDeleteConfirm,
    closeEditModal,
    closeDeleteModal,
  };
}
