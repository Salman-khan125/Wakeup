import React, { createContext, useState, useContext } from "react";

const StopContext = createContext();

export const useStops = () => {
  const context = useContext(StopContext);
  if (!context) {
    throw new Error("useStops must be used within a StopProvider");
  }
  return context;
};

export const StopProvider = ({ children }) => {
  // Updated to match Stop.jsx data structure exactly
  const [stops, setStops] = useState([
    { id: 1, name: "Daroukhane", Latitude: "14.749862", longitude: "14.7498674", city: "New York", qr: "Frame1" },
    { id: 2, name: "Daroukhane", Latitude: "14.749862", longitude: "14.7498674", city: "New York", qr: "Frame2" },
    { id: 3, name: "Daroukhane", Latitude: "14.749862", longitude: "14.7498674", city: "New York", qr: "Frame1" },
    { id: 4, name: "Daroukhane", Latitude: "14.749862", longitude: "14.7498674", city: "New York", qr: "Frame1" },
    { id: 5, name: "Daroukhane", Latitude: "14.749862", longitude: "14.7498674", city: "New York", qr: "Frame2" },
    { id: 6, name: "Daroukhane", Latitude: "14.749862", longitude: "14.7498674", city: "New York", qr: "Frame1" },
  ]);

  const addStop = (newStop) => {
    const id = stops.length > 0 
      ? Math.max(...stops.map(s => s.id)) + 1 
      : 1;
    
    setStops([...stops, { ...newStop, id }]);
    console.log("Added stop:", newStop);
  };

  const updateStop = (id, updatedData) => {
    setStops(prev => 
      prev.map(stop => 
        stop.id === id ? { ...stop, ...updatedData } : stop
      )
    );
    console.log("Updated stop ID:", id, "with data:", updatedData);
  };

  const deleteStop = (id) => {
    setStops(prev => prev.filter(stop => stop.id !== id));
    console.log("Deleted stop ID:", id);
  };

  const value = {
    stops,
    addStop,
    updateStop,
    deleteStop,
  };

  return (
    <StopContext.Provider value={value}>
      {children}
    </StopContext.Provider>
  );
};