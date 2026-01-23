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
    { id_driver: 1, first_name: "Allley", lastname: "jhone", phone: "+00*******", Email: "AlleyJhone", password: "asd123", license: "0947563", is_online: "online", id_company: "FK", id_bus: "3" },
    { id_driver: 2, first_name: "Allley", lastname: "jhone", phone: "+00*******", Email: "AlleyJhone", password: "asd123", license: "0947563", is_online: "online", id_company: "FK", id_bus: "3" },
    { id_driver: 3, first_name: "Allley", lastname: "jhone", phone: "+00*******", Email: "AlleyJhone", password: "asd123", license: "0947563", is_online: "offline", id_company: "FK", id_bus: "3" },
    { id_driver: 4, first_name: "Allley", lastname: "jhone", phone: "+00*******", Email: "AlleyJhone", password: "asd123", license: "0947563", is_online: "online", id_company: "FK", id_bus: "3" },
    { id_driver: 5, first_name: "Allley", lastname: "jhone", phone: "+00*******", Email: "AlleyJhone", password: "asd123", license: "0947563", is_online: "offline", id_company: "FK", id_bus: "3" },
    { id_driver: 6, first_name: "Allley", lastname: "jhone", phone: "+00*******", Email: "AlleyJhone", password: "asd123", license: "0947563", is_online: "online", id_company: "FK", id_bus: "3" },
  ]);

  const addDriver = (newDriver) => {
    const id = drivers.length > 0 
      ? Math.max(...drivers.map(d => d.id_driver)) + 1 
      : 1;
    
    setDrivers([...drivers, { ...newDriver, id_driver: id }]);
    console.log("Added driver:", newDriver);
  };

  const updateDriver = (id, updatedData) => {
    console.log("updateDriver called - ID:", id, "Data:", updatedData);
    
    setDrivers(prev => 
      prev.map(driver => {
        // Use == for comparison (string vs number)
        if (driver.id_driver == id) {
          console.log("Found driver to update:", driver);
          return { ...driver, ...updatedData };
        }
        return driver;
      })
    );
  };

  const deleteDriver = (id) => {
    setDrivers(prev => prev.filter(driver => driver.id_driver != id));
    console.log("Deleted driver ID:", id);
  };

  const value = {
    drivers,
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