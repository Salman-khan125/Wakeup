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
  // Updated data structure with new field names
  const [lines, setLines] = useState([
    { 
      id_line: 1, 
      line_name: "Main Line", 
      description: "Main city route", 
      distance_km: "25", 
      id_company: 1 
    },
    { 
      id_line: 2, 
      line_name: "Express Line", 
      description: "Fast express route", 
      distance_km: "40", 
      id_company: 2 
    },
    { 
      id_line: 3, 
      line_name: "Suburban Line", 
      description: "Suburban areas route", 
      distance_km: "35", 
      id_company: 1 
    },
    { 
      id_line: 4, 
      line_name: "Night Line", 
      description: "Night service route", 
      distance_km: "30", 
      id_company: 3 
    },
    { 
      id_line: 5, 
      line_name: "Airport Line", 
      description: "Airport shuttle route", 
      distance_km: "50", 
      id_company: 2 
    },
    { 
      id_line: 6, 
      line_name: "University Line", 
      description: "University campus route", 
      distance_km: "20", 
      id_company: 3 
    },
  ]);

  const addLine = (newLine) => {
    console.log("addLine called with:", newLine);
    
    // Find the maximum id_line (NOT id)
    const maxId = lines.length > 0 
      ? Math.max(...lines.map(l => l.id_line)) 
      : 0;
    
    const newId = maxId + 1;
    
    console.log("New line ID:", newId);
    
    // Create the new line with id_line field
    const lineToAdd = {
      ...newLine,
      id_line: newId,  // Use id_line, not id
    };
    
    setLines(prev => [...prev, lineToAdd]);
    console.log("Line added. Total lines:", lines.length + 1);
  };

  const updateLine = (id, updatedData) => {
    console.log("=== LINE CONTEXT updateLine ===");
    console.log("ID to update:", id);
    console.log("Data to update with:", updatedData);
    
    setLines(prevLines => {
      const updatedLines = prevLines.map(line => {
        // Use == for comparison (string vs number) and id_line
        if (line.id_line == id) {
          console.log("Found line to update:", line);
          const updatedLine = {
            ...line,
            ...updatedData
          };
          console.log("Updated line will be:", updatedLine);
          return updatedLine;
        }
        return line;
      });
      
      console.log("Lines AFTER update:", updatedLines);
      return updatedLines;
    });
    
    console.log("Line update function completed");
  };

  const deleteLine = (id) => {
    console.log("deleteLine called for id:", id);
    setLines(prev => prev.filter(line => line.id_line != id));  // Use id_line and !=
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