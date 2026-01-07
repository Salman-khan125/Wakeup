import React, { createContext, useState, useContext } from "react";

const CountryContext = createContext();

export const useCountries = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountries must be used within a CountryProvider");
  }
  return context;
};

export const CountryProvider = ({ children }) => {
  // Use YOUR exact data structure BUT fix field names to match your Country.jsx
  const [countries, setCountries] = useState([
  { id: 1, name: "London", code: "SL", region: "Region" },
  { id: 2, name: "Paris", code: "FR", region: "Region" },
  { id: 3, name: "Tokyo", code: "JP", region: "Region" },
  { id: 4, name: "New York", code: "US", region: "Region" },
  { id: 5, name: "Berlin", code: "DE", region: "Region" },
  { id: 6, name: "Madrid", code: "ES", region: "Region" },
  { id: 7, name: "Rome", code: "IT", region: "Region" },
  ]);

  const addCountry = (newCountry) => {
    const id = countries.length > 0 
      ? Math.max(...countries.map(c => c.id)) + 1 
      : 1;
    
    setCountries([...countries, { ...newCountry, id }]);
    console.log("Added country:", newCountry);
  };

  const updateCountry = (id, updatedData) => {
    setCountries(prev => 
      prev.map(country =>  // lowercase 'country'
        country.id === id ? { ...country, ...updatedData } : country
      )
    );
    console.log("Updated country ID:", id, "with data:", updatedData);
  };

  const deleteCountry = (id) => {
    setCountries(prev => prev.filter(country => country.id !== id));
    console.log("Deleted country ID:", id);
  };

  const value = {
    countries,  // lowercase - must match what useCountries() returns
    addCountry,
    updateCountry,
    deleteCountry,
  };

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
};