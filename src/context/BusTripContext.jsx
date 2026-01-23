import React, { createContext, useState, useContext } from "react";

const BusTripContext = createContext();

export const useBusTrips = () => {
  const context = useContext(BusTripContext);
  if (!context) {
    throw new Error("useBusTrips must be used within a BusTripProvider");
  }
  return context;
};

export const BusTripProvider = ({ children }) => {
  const [busTrips, setBusTrips] = useState([
    {
      id_bus_trip: 1,
      id_bus: 101,
      id_trip: 12,
      service_date: "2024-01-15",
      actual_departure: "08:05",
      status: "completed",
    },
    {
      id_bus_trip: 2,
      id_bus: 102,
      id_trip: 8,
      service_date: "2024-01-15",
      actual_departure: "10:32",
      status: "completed",
    },
    {
      id_bus_trip: 3,
      id_bus: 103,
      id_trip: 15,
      service_date: "2024-01-16",
      actual_departure: "14:02",
      status: "in_service",
    },
    {
      id_bus_trip: 4,
      id_bus: 104,
      id_trip: 3,
      service_date: "2024-01-16",
      actual_departure: "18:15",
      status: "paused",
    },
    {
      id_bus_trip: 5,
      id_bus: 105,
      id_trip: 7,
      service_date: "2024-01-17",
      actual_departure: "20:10",
      status: "in_service",
    },
    {
      id_bus_trip: 6,
      id_bus: 101,
      id_trip: 12,
      service_date: "2024-01-17",
      actual_departure: "08:03",
      status: "completed",
    },
    {
      id_bus_trip: 7,
      id_bus: 106,
      id_trip: 8,
      service_date: "2024-01-17",
      actual_departure: "10:35",
      status: "completed",
    },
    {
      id_bus_trip: 8,
      id_bus: 107,
      id_trip: 15,
      service_date: "2024-01-18",
      actual_departure: "14:00",
      status: "in_service",
    },
  ]);

  const addBusTrip = (newBusTrip) => {
    const id_bus_trip = busTrips.length > 0 ? Math.max(...busTrips.map((b) => b.id_bus_trip)) + 1 : 1;
    
    const busTripWithDefaults = {
      ...newBusTrip,
      id_bus_trip,
    };

    setBusTrips([...busTrips, busTripWithDefaults]);
    console.log("Added bus trip:", busTripWithDefaults);
  };

  const updateBusTrip = (id_bus_trip, updatedData) => {
    setBusTrips((prev) =>
      prev.map((busTrip) => 
        busTrip.id_bus_trip === id_bus_trip ? { ...busTrip, ...updatedData } : busTrip
      ),
    );
    console.log("Updated bus trip ID:", id_bus_trip, "with data:", updatedData);
  };

  const deleteBusTrip = (id_bus_trip) => {
    setBusTrips((prev) => prev.filter((busTrip) => busTrip.id_bus_trip !== id_bus_trip));
    console.log("Deleted bus trip ID:", id_bus_trip);
  };

  // Helper function to get bus trip by ID
  const getBusTripById = (id_bus_trip) => {
    return busTrips.find(busTrip => busTrip.id_bus_trip === id_bus_trip);
  };

  const value = {
    busTrips,
    addBusTrip,
    updateBusTrip,
    deleteBusTrip,
    getBusTripById,
  };

  return <BusTripContext.Provider value={value}>{children}</BusTripContext.Provider>;
};