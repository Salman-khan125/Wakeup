import React, { createContext, useState, useContext } from "react";

const BusContext = createContext();

export const useBuses = () => {
  const context = useContext(BusContext);
  if (!context) {
    throw new Error("useBuses must be used within a BusProvider");
  }
  return context;
};

export const BusProvider = ({ children }) => {
  // Your bus data structure
  const [buses, setBuses] = useState([
    {
      id_bus: 1,
      plate_number: "ale848",
      capacity: "SL",
      model: "Region",
      status: "active",
      id_company: "Fk",
    },
    {
      id_bus: 2,
      plate_number: "ale848",
      capacity: "SL",
      model: "Region",
      status: "maintenance",
      id_company: "Fk",
    },
    {
      id_bus: 3,
      plate_number: "ale848",
      capacity: "SL",
      model: "Region",
      status: "outofservice",
      id_company: "Fk",
    },
    {
      id_bus: 4,
      plate_number: "ale848",
      capacity: "SL",
      model: "Region",
      status: "active",
      id_company: "Fk",
    },
    {
      id_bus: 5,
      plate_number: "ale848",
      capacity: "SL",
      model: "Region",
      status: "outofservice",
      id_company: "Fk",
    },
    {
      id_bus: 6,
      plate_number: "ale848",
      capacity: "SL",
      model: "Region",
      status: "maintenance",
      id_company: "Fk",
    },
    
  ]);

  const addBus = (newBus) => {
    console.log("addBus called with:", newBus);
    
    // Find the maximum id_bus (not id)
    const maxId = buses.length > 0 
      ? Math.max(...buses.map((b) => b.id_bus)) 
      : 0;
    
    const newId = maxId + 1;
    
    console.log("Current max ID:", maxId, "New ID:", newId);
    
    // Use id_bus, not id
    setBuses([...buses, { ...newBus, id_bus: newId }]);
    console.log("Added bus with id_bus:", newId);
  };

  const updateBus = (id, updatedData) => {
    console.log("updateBus called - ID:", id, "Data:", updatedData);
    
    setBuses((prev) =>
      prev.map((bus) => 
        bus.id_bus == id ? { ...bus, ...updatedData } : bus  // Use id_bus and ==
      ),
    );
    console.log("Updated bus ID:", id, "with data:", updatedData);
  };

  const deleteBus = (id) => {
    console.log("deleteBus called for id:", id);
    setBuses((prev) => prev.filter((bus) => bus.id_bus != id));  // Use id_bus and !=
    console.log("Deleted bus ID:", id);
  };

  const value = {
    buses,
    addBus,
    updateBus,
    deleteBus,
  };

  return <BusContext.Provider value={value}>{children}</BusContext.Provider>;
};
