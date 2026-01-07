import React, { createContext, useState, useContext } from "react";

const CompanyContext = createContext();

export const useCompanies = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompanies must be used within a CompanyProvider");
  }
  return context;
};

export const CompanyProvider = ({ children }) => {
  // Use YOUR exact data structure
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Co founder",
      address: "Mainroad near st haul school",
      contact: "+00*******",
      Registration: "16/12/2025",
      Email: "AlleyJhone",
    },
    {
      id: 2,
      name: "Co founder",
      address: "Mainroad near st haul school",
      contact: "+00*******",
      Registration: "16/12/2025",
      Email: "AlleyJhone",
    },
    {
      id: 3,
      name: "Co founder",
      address: "Mainroad near st haul school",
      contact: "+00*******",
      Registration: "16/12/2025",
      Email: "AlleyJhone",
    },
    {
      id: 4,
      name: "Co founder",
      address: "Mainroad near st haul school",
      contact: "+00*******",
      Registration: "16/12/2025",
      Email: "AlleyJhone",
    },
    {
      id: 5,
      name: "Co founder",
      address: "Mainroad near st haul school",
      contact: "+00*******",
      Registration: "16/12/2025",
      Email: "AlleyJhone",
    },
    {
      id: 6,
      name: "Co founder",
      address: "Mainroad near st haul school",
      contact: "+00*******",
      Registration: "16/12/2025",
      Email: "AlleyJhone",
    },
  ]);

  const addCompany = (newCompany) => {
    const id = companies.length > 0 
      ? Math.max(...companies.map(c => c.id)) + 1 
      : 1;
    
    setCompanies([...companies, { ...newCompany, id }]);
    console.log("Added company:", newCompany);
  };

  const updateCompany = (id, updatedData) => {
    setCompanies(prev => 
      prev.map(company => 
        company.id === id ? { ...company, ...updatedData } : company
      )
    );
    console.log("Updated company ID:", id, "with data:", updatedData);
  };

  const deleteCompany = (id) => {
    setCompanies(prev => prev.filter(company => company.id !== id));
    console.log("Deleted company ID:", id);
  };

  const value = {
    companies,
    addCompany,
    updateCompany,
    deleteCompany,
  };

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  );
};