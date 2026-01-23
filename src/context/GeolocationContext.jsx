import React, { createContext, useState, useContext } from "react";

const GeolocationContext = createContext();

export const useGeolocations = () => {
  const context = useContext(GeolocationContext);
  if (!context) {
    throw new Error("useGeolocations must be used within a GeolocationProvider");
  }
  return context;
};

export const GeolocationProvider = ({ children }) => {
  const [geolocations, setGeolocations] = useState([
    {
      id_geo: 1,
      id_bus_trip: 1,
      latitude: 40.712776,
      longitude: -74.005974,
      timestamp: "2024-01-15T08:05:00Z",
    },
    {
      id_geo: 2,
      id_bus_trip: 1,
      latitude: 40.712886,
      longitude: -74.006074,
      timestamp: "2024-01-15T08:10:00Z",
    },
    {
      id_geo: 3,
      id_bus_trip: 2,
      latitude: 40.713000,
      longitude: -74.006200,
      timestamp: "2024-01-15T10:32:00Z",
    },
    {
      id_geo: 4,
      id_bus_trip: 2,
      latitude: 40.713500,
      longitude: -74.006800,
      timestamp: "2024-01-15T10:40:00Z",
    },
    {
      id_geo: 5,
      id_bus_trip: 3,
      latitude: 40.714000,
      longitude: -74.007000,
      timestamp: "2024-01-16T14:02:00Z",
    },
    {
      id_geo: 6,
      id_bus_trip: 3,
      latitude: 40.714500,
      longitude: -74.007500,
      timestamp: "2024-01-16T14:10:00Z",
    },
    {
      id_geo: 7,
      id_bus_trip: 4,
      latitude: 40.715000,
      longitude: -74.008000,
      timestamp: "2024-01-16T18:15:00Z",
    },
    {
      id_geo: 8,
      id_bus_trip: 4,
      latitude: 40.715500,
      longitude: -74.008500,
      timestamp: "2024-01-16T18:25:00Z",
    },
    {
      id_geo: 9,
      id_bus_trip: 5,
      latitude: 40.716000,
      longitude: -74.009000,
      timestamp: "2024-01-17T20:10:00Z",
    },
    {
      id_geo: 10,
      id_bus_trip: 5,
      latitude: 40.716500,
      longitude: -74.009500,
      timestamp: "2024-01-17T20:20:00Z",
    },
  ]);

  const addGeolocation = (newGeolocation) => {
    const id_geo = geolocations.length > 0 ? Math.max(...geolocations.map((g) => g.id_geo)) + 1 : 1;
    
    const geolocationWithDefaults = {
      ...newGeolocation,
      id_geo,
      timestamp: newGeolocation.timestamp || new Date().toISOString(),
    };

    setGeolocations([...geolocations, geolocationWithDefaults]);
    console.log("Added geolocation:", geolocationWithDefaults);
  };

  const updateGeolocation = (id_geo, updatedData) => {
    setGeolocations((prev) =>
      prev.map((geo) => 
        geo.id_geo === id_geo ? { ...geo, ...updatedData } : geo
      ),
    );
    console.log("Updated geolocation ID:", id_geo, "with data:", updatedData);
  };

  const deleteGeolocation = (id_geo) => {
    setGeolocations((prev) => prev.filter((geo) => geo.id_geo !== id_geo));
    console.log("Deleted geolocation ID:", id_geo);
  };

  // Helper function to get geolocation by ID
  const getGeolocationById = (id_geo) => {
    return geolocations.find(geo => geo.id_geo === id_geo);
  };

  const value = {
    geolocations,
    addGeolocation,
    updateGeolocation,
    deleteGeolocation,
    getGeolocationById,
  };

  return <GeolocationContext.Provider value={value}>{children}</GeolocationContext.Provider>;
};