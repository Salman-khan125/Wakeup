import React, { createContext, useState, useContext } from "react";

const AlertContext = createContext();

export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlerts must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([
    {
      id_alert: 1,
      id_bus_trip: 3,
      id_driver: 101,
      alert_type: "delay",
      message: "Bus delayed due to traffic on Main Street",
      status: "resolved",
      created_at: "2024-01-16T14:15:00Z",
    },
    {
      id_alert: 2,
      id_bus_trip: 4,
      id_driver: 102,
      alert_type: "breakdown",
      message: "Mechanical issue, need assistance",
      status: "in_progress",
      created_at: "2024-01-16T18:30:00Z",
    },
    {
      id_alert: 3,
      id_bus_trip: 5,
      id_driver: 103,
      alert_type: "incident",
      message: "Passenger medical emergency",
      status: "resolved",
      created_at: "2024-01-17T20:25:00Z",
    },
    {
      id_alert: 4,
      id_bus_trip: 1,
      id_driver: 101,
      alert_type: "delay",
      message: "Late departure due to driver shift change",
      status: "resolved",
      created_at: "2024-01-15T08:15:00Z",
    },
    {
      id_alert: 5,
      id_bus_trip: 6,
      id_driver: 104,
      alert_type: "other",
      message: "Route deviation due to road closure",
      status: "new",
      created_at: "2024-01-17T08:20:00Z",
    },
    {
      id_alert: 6,
      id_bus_trip: 2,
      id_driver: 102,
      alert_type: "incident",
      message: "Minor accident, no injuries reported",
      status: "resolved",
      created_at: "2024-01-15T10:45:00Z",
    },
    {
      id_alert: 7,
      id_bus_trip: 7,
      id_driver: 105,
      alert_type: "delay",
      message: "Waiting for replacement bus",
      status: "in_progress",
      created_at: "2024-01-17T10:35:00Z",
    },
    {
      id_alert: 8,
      id_bus_trip: 8,
      id_driver: 106,
      alert_type: "breakdown",
      message: "Engine overheating, pulled over",
      status: "new",
      created_at: "2024-01-18T14:15:00Z",
    },
  ]);

  const addAlert = (newAlert) => {
    const id_alert = alerts.length > 0 ? Math.max(...alerts.map((a) => a.id_alert)) + 1 : 1;
    
    const alertWithDefaults = {
      ...newAlert,
      id_alert,
      created_at: newAlert.created_at || new Date().toISOString(),
      status: newAlert.status || "new",
    };

    setAlerts([...alerts, alertWithDefaults]);
    console.log("Added alert:", alertWithDefaults);
  };

  const updateAlert = (id_alert, updatedData) => {
    setAlerts((prev) =>
      prev.map((alert) => 
        alert.id_alert === id_alert ? { ...alert, ...updatedData } : alert
      ),
    );
    console.log("Updated alert ID:", id_alert, "with data:", updatedData);
  };

  const deleteAlert = (id_alert) => {
    setAlerts((prev) => prev.filter((alert) => alert.id_alert !== id_alert));
    console.log("Deleted alert ID:", id_alert);
  };

  // Helper function to get alert by ID
  const getAlertById = (id_alert) => {
    return alerts.find(alert => alert.id_alert === id_alert);
  };

  const value = {
    alerts,
    addAlert,
    updateAlert,
    deleteAlert,
    getAlertById,
  };

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
};