import React, { createContext, useState, useContext } from "react";

const DriverContext = createContext();

export const useDrivers = () => {
  const context = useContext(DriverContext);
  if (!context) {
    throw new Error("useDrivers must be used within a DriverProvider");
  }
  return context;
};

export const DriverProvider = ({ children }) => {
  // Use lowercase 'drivers' for consistency
  const [drivers, setDrivers] = useState([
    { id: 1, name: "Allley", lastname: "jhone", contact: "+00*******", Email: "AlleyJhone", license: "0947563", status: "online" },
    { id: 2, name: "Allley", lastname: "jhone", contact: "+00*******", Email: "AlleyJhone", license: "0947563", status: "online" },
    { id: 3, name: "Allley", lastname: "jhone", contact: "+00*******", Email: "AlleyJhone", license: "0947563", status: "offline" },
    { id: 4, name: "Allley", lastname: "jhone", contact: "+00*******", Email: "AlleyJhone", license: "0947563", status: "online" },
    { id: 5, name: "Allley", lastname: "jhone", contact: "+00*******", Email: "AlleyJhone", license: "0947563", status: "offline" },
    { id: 6, name: "Allley", lastname: "jhone", contact: "+00*******", Email: "AlleyJhone", license: "0947563", status: "online" },
  ]);

  const addDriver = (newDriver) => {
    const id = drivers.length > 0 
      ? Math.max(...drivers.map(d => d.id)) + 1 
      : 1;
    
    setDrivers([...drivers, { ...newDriver, id }]);
    console.log("Added driver:", newDriver);
  };

  const updateDriver = (id, updatedData) => {
    setDrivers(prev => 
      prev.map(driver =>  // lowercase 'driver'
        driver.id === id ? { ...driver, ...updatedData } : driver
      )
    );
    console.log("Updated driver ID:", id, "with data:", updatedData);
  };

  const deleteDriver = (id) => {
    setDrivers(prev => prev.filter(driver => driver.id !== id));
    console.log("Deleted driver ID:", id);
  };

  const value = {
    drivers,  // lowercase - must match
    addDriver,
    updateDriver,
    deleteDriver,
  };

  return (
    <DriverContext.Provider value={value}>
      {children}
    </DriverContext.Provider>
  );
};