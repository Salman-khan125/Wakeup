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
    { id: 1, number: "ale848", seat: "SL", model: "Region", status: "green" },
    { id: 2, number: "ale848", seat: "SL", model: "Region", status: "yellow" },
    { id: 3, number: "ale848", seat: "SL", model: "Region", status: "orange" },
    { id: 4, number: "ale848", seat: "SL", model: "Region", status: "green" },
    { id: 5, number: "ale848", seat: "SL", model: "Region", status: "orange" },
    { id: 6, number: "ale848", seat: "SL", model: "Region", status: "yellow" },
  ]);

  const addBus = (newBus) => {
    const id = buses.length > 0 
      ? Math.max(...buses.map(b => b.id)) + 1 
      : 1;
    
    setBuses([...buses, { ...newBus, id }]);
    console.log("Added bus:", newBus);
  };

  const updateBus = (id, updatedData) => {
    setBuses(prev => 
      prev.map(bus => 
        bus.id === id ? { ...bus, ...updatedData } : bus
      )
    );
    console.log("Updated bus ID:", id, "with data:", updatedData);
  };

  const deleteBus = (id) => {
    setBuses(prev => prev.filter(bus => bus.id !== id));
    console.log("Deleted bus ID:", id);
  };

  const value = {
    buses,
    addBus,
    updateBus,
    deleteBus,
  };

  return (
    <BusContext.Provider value={value}>
      {children}
    </BusContext.Provider>
  );
};