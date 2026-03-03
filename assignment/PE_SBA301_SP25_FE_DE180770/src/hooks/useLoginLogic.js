import { useState } from "react";
import authService from "../services/authService";

export default function useLoginLogic(onSuccess) {
  const [credentials, setCredentials] = useState({
    memberID: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login(credentials.memberID, credentials.password);
      setError("");
      if (typeof onSuccess === "function") onSuccess();
    } catch (err) {
      setError("Invalid Member ID or Password.");
    }
  };

  return { credentials, setCredentials, error, handleLogin };
}
