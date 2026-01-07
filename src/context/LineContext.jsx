import React, { createContext, useState, useContext } from "react";

const LineContext = createContext();

export const useLines = () => {
  const context = useContext(LineContext);
  if (!context) {
    throw new Error("useLines must be used within a LineProvider");
  }
  return context;
};

export const LineProvider = ({ children }) => {
  // Using EXACT same data structure as your Line.jsx
  const [lines, setLines] = useState([
    { id: 1, name: "Alley", Email: "Alleyjhon@gmail.com", Role: "Region" },
    { id: 2, name: "Alley", Email: "Alleyjhon@gmail.com", Role: "Region" },
    { id: 3, name: "alley", Email: "Alleyjhon@gmail.com", Role: "Region" },
    { id: 4, name: "Alley", Email: "Alleyjhon@gmail.com", Role: "Region" },
    { id: 5, name: "Alley", Email: "Alleyjhon@gmail.com", Role: "Region" },
    { id: 6, name: "Alley", Email: "Alleyjhon@gmail.com", Role: "Region" },
    { id: 7, name: "Alley", Email: "Alleyjhon@gmail.com", Role: "Region" },
  ]);

  const addLine = (newLine) => {
    const id = lines.length > 0 
      ? Math.max(...lines.map(l => l.id)) + 1 
      : 1;
    
    setLines([...lines, { ...newLine, id }]);
    console.log("Added line:", newLine);
  };

  const updateLine = (id, updatedData) => {
    setLines(prev => 
      prev.map(line => 
        line.id === id ? { ...line, ...updatedData } : line
      )
    );
    console.log("Updated line ID:", id, "with data:", updatedData);
  };

  const deleteLine = (id) => {
    setLines(prev => prev.filter(line => line.id !== id));
    console.log("Deleted line ID:", id);
  };

  const value = {
    lines,
    addLine,
    updateLine,
    deleteLine,
  };

  return (
    <LineContext.Provider value={value}>
      {children}
    </LineContext.Provider>
  );
};