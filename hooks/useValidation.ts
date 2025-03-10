import { useState } from "react";

export function useValidation() {
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");

  const validateName = (name: string) => {
    if (!name.trim() || name.trim().length < 3) {
      setNameError("Name must be at least 3 characters long.");
      return false;
    }
    setNameError("");
    return true;
  };

  const validatePrice = (price: string) => {
    const numericValue = price.replace(/[^0-9.]/g, "");
    if (!numericValue.trim() || isNaN(parseFloat(numericValue))) {
      setPriceError("Please enter a valid numeric price.");
      return false;
    }
    setPriceError("");
    return true;
  };

  return {
    nameError,
    priceError,
    validateName,
    validatePrice,
    setNameError,
    setPriceError,
  };
}
