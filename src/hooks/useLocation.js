import { useState } from "react";

export default function useLocation() {
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState(null);
  const getLocationFunc = async (destination) => {
    try {
      const response = await fetch(destination);
      const jsonData = await response.json();
      console.log(jsonData);
      if (jsonData) {
        setLocationData(jsonData);
      }
    } catch (err) {
      setError(err.message);
    }
  };
  return {
    locationData,
    error,
    getLocationFunc,
  };
}
