import React, { createContext, useState, useContext } from "react";

const TripContext = createContext();

export const useTrips = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("useTrips must be used within a TripProvider");
  }
  return context;
};

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([
    {
      id_trip: 1,
      id_line: 12,
      direction: "outbound",
      scheduled_departure: "08:00",
      scheduled_arrival: "08:45",
    },
    {
      id_trip: 2,
      id_line: 12,
      direction: "return",
      scheduled_departure: "09:00",
      scheduled_arrival: "09:45",
    },
    {
      id_trip: 3,
      id_line: 8,
      direction: "outbound",
      scheduled_departure: "10:30",
      scheduled_arrival: "11:15",
    },
    {
      id_trip: 4,
      id_line: 8,
      direction: "return",
      scheduled_departure: "12:00",
      scheduled_arrival: "12:45",
    },
    {
      id_trip: 5,
      id_line: 15,
      direction: "outbound",
      scheduled_departure: "14:00",
      scheduled_arrival: "15:30",
    },
    {
      id_trip: 6,
      id_line: 15,
      direction: "return",
      scheduled_departure: "16:00",
      scheduled_arrival: "17:30",
    },
    {
      id_trip: 7,
      id_line: 3,
      direction: "outbound",
      scheduled_departure: "18:00",
      scheduled_arrival: "18:30",
    },
    {
      id_trip: 8,
      id_line: 3,
      direction: "return",
      scheduled_departure: "19:00",
      scheduled_arrival: "19:30",
    },
    {
      id_trip: 9,
      id_line: 7,
      direction: "outbound",
      scheduled_departure: "20:00",
      scheduled_arrival: "21:00",
    },
    {
      id_trip: 10,
      id_line: 7,
      direction: "return",
      scheduled_departure: "21:30",
      scheduled_arrival: "22:30",
    },
  ]);

  const addTrip = (newTrip) => {
    const id_trip = trips.length > 0 ? Math.max(...trips.map((t) => t.id_trip)) + 1 : 1;
    
    const tripWithDefaults = {
      ...newTrip,
      id_trip,
    };

    setTrips([...trips, tripWithDefaults]);
    console.log("Added trip:", tripWithDefaults);
  };

  const updateTrip = (id_trip, updatedData) => {
    setTrips((prev) =>
      prev.map((trip) => 
        trip.id_trip === id_trip ? { ...trip, ...updatedData } : trip
      ),
    );
    console.log("Updated trip ID:", id_trip, "with data:", updatedData);
  };

  const deleteTrip = (id_trip) => {
    setTrips((prev) => prev.filter((trip) => trip.id_trip !== id_trip));
    console.log("Deleted trip ID:", id_trip);
  };

  // Helper function to get trip by ID
  const getTripById = (id_trip) => {
    return trips.find(trip => trip.id_trip === id_trip);
  };

  const value = {
    trips,
    addTrip,
    updateTrip,
    deleteTrip,
    getTripById,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};