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
  // UPDATED: Using new field names exactly as in Stop.jsx
  const [stops, setStops] = useState([
    {
      id_stop: 1,
      stop_name: "Daroukhane",
      Latitude: "14.749862",
      longitude: "14.7498674",
      city: "New York",
      qr_code: "Frame1",
      id_country: 1, // ADDED: Country ID
    },
    {
      id_stop: 2,
      stop_name: "Central Station",
      Latitude: "14.749863",
      longitude: "14.7498675",
      city: "Los Angeles",
      qr_code: "Frame2",
      id_country: 1, // ADDED: Country ID
    },
    {
      id_stop: 3,
      stop_name: "North Terminal",
      Latitude: "14.749864",
      longitude: "14.7498676",
      city: "Chicago",
      qr_code: "Frame1",
      id_country: 2, // ADDED: Country ID
    },
    {
      id_stop: 4,
      stop_name: "South Square",
      Latitude: "14.749865",
      longitude: "14.7498677",
      city: "Houston",
      qr_code: "Frame1",
      id_country: 2, // ADDED: Country ID
    },
    {
      id_stop: 5,
      stop_name: "East Plaza",
      Latitude: "14.749866",
      longitude: "14.7498678",
      city: "Phoenix",
      qr_code: "Frame2",
      id_country: 3, // ADDED: Country ID
    },
    {
      id_stop: 6,
      stop_name: "West Hub",
      Latitude: "14.749867",
      longitude: "14.7498679",
      city: "Philadelphia",
      qr_code: "Frame1",
      id_country: 3, // ADDED: Country ID
    },
  ]);

  const addStop = (newStop) => {
    // Generate new ID based on id_stop
    const id_stop = stops.length > 0 ? Math.max(...stops.map((s) => s.id_stop)) + 1 : 1;

    setStops([...stops, { ...newStop, id_stop }]);
    console.log("Added stop:", newStop);
  };

  const updateStop = (id_stop, updatedData) => {
    setStops((prev) =>
      prev.map((stop) => (stop.id_stop === id_stop ? { ...stop, ...updatedData } : stop)),
    );
    console.log("Updated stop ID:", id_stop, "with data:", updatedData);
  };

  const deleteStop = (id_stop) => {
    setStops((prev) => prev.filter((stop) => stop.id_stop !== id_stop));
    console.log("Deleted stop ID:", id_stop);
  };

  const value = {
    stops,
    addStop,
    updateStop,
    deleteStop,
  };

  return <StopContext.Provider value={value}>{children}</StopContext.Provider>;
};