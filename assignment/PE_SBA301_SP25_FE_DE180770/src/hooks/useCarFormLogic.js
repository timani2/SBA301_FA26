import { useEffect, useState } from "react";
import carService from "../services/carService";

export default function useCarFormLogic(id, navigate) {
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    carName: "",
    unitsInStock: 5,
    unitPrice: 0,
    country: { countryID: "" },
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await carService.getAllCountries();
        setCountries(res.data);
      } catch (err) {
        console.error("Failed to load countries");
      }
    };
    fetchCountries();

    if (id) {
      const fetchCar = async () => {
        try {
          const res = await carService.getCarById(id);
          const data = res.data;
          setFormData({
            carName: data.carName,
            unitsInStock: data.unitsInStock,
            unitPrice: data.unitPrice,
            country: { countryID: data.countryID },
          });
        } catch (err) {
          setError("Cannot load car details.");
        }
      };
      fetchCar();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.carName.length <= 10)
      return setError("Car Name must be more than 10 characters.");
    if (formData.unitsInStock < 5 || formData.unitsInStock > 20)
      return setError("Units In Stock must be between 5 and 20.");

    try {
      const dataToSend = {
        ...formData,
        unitsInStock: parseInt(formData.unitsInStock),
        unitPrice: parseFloat(formData.unitPrice),
      };

      if (id) {
        await carService.updateCar(id, dataToSend);
      } else {
        await carService.createCar(dataToSend);
      }
      navigate("/cars");
    } catch (err) {
      setError(
        "Error saving car: " + (err.response?.data?.message || err.message),
      );
    }
  };

  const selectedCountryName = countries.find(
    (c) => String(c.countryID) === String(formData.country.countryID),
  )?.countryName;

  return {
    countries,
    formData,
    setFormData,
    error,
    handleSubmit,
    selectedCountryName,
  };
}
