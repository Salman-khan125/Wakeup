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
  const [companies, setCompanies] = useState([
    {
      id_company: 1,
      company_name: "Co founder",
      company_logo: "Logo1",
      transport_type: "public",
      activity_domain: "personal",
      address: "Mainroad near st haul school",
      phone: "+00*******",
      created_at: "16/12/2025",
      id_country: "Fk",
      Email: "AlleyJhone",
    },
    {
      id_company: 2,
      company_name: "Co founder",
      company_logo: "Logo2",
      transport_type: "private",
      activity_domain: "education",
      address: "Mainroad near st haul school",
      phone: "+00*******",
      created_at: "16/12/2025",
      id_country: "Fk",
      Email: "AlleyJhone",
    },
    {
      id_company: 3,
      company_name: "Co founder",
      company_logo: "Logo3",
      transport_type: "public",
      activity_domain: "tourism",
      address: "Mainroad near st haul school",
      phone: "+00*******",
      created_at: "16/12/2025",
      id_country: "Fk",
      Email: "AlleyJhone",
    },
    {
      id_company: 4,
      company_name: "Co founder",
      company_logo: "Logo4",
      transport_type: "private",
      activity_domain: "private",
      address: "Mainroad near st haul school",
      phone: "+00*******",
      created_at: "16/12/2025",
      id_country: "Fk",
      Email: "AlleyJhone",
    },
    {
      id_company: 5,
      company_name: "Co founder",
      company_logo: "Logo5",
      transport_type: "public",
      activity_domain: "mixed",
      address: "Mainroad near st haul school",
      phone: "+00*******",
      created_at: "16/12/2025",
      id_country: "Fk",
      Email: "AlleyJhone",
    },
    {
      id_company: 6,
      company_name: "Co founder",
      company_logo: "Logo6",
      transport_type: "private",
      activity_domain: "personal",
      address: "Mainroad near st haul school",
      phone: "+00*******",
      created_at: "16/12/2025",
      id_country: "Fk",
      Email: "AlleyJhone",
    },
  ]);

  const addCompany = (newCompany) => {
    console.log("addCompany called with:", newCompany);
    
    // Find the maximum id_company (NOT id)
    const maxId = companies.length > 0 
      ? Math.max(...companies.map(c => c.id_company)) 
      : 0;
    
    const newId = maxId + 1;
    
    console.log("New company ID:", newId);
    
    // Create the new company with id_company field
    const companyToAdd = {
      ...newCompany,
      id_company: newId,  // Use id_company, not id
    };
    
    setCompanies(prev => [...prev, companyToAdd]);
    console.log("Company added. Total companies:", companies.length + 1);
  };

  const updateCompany = (id, updatedData) => {
    console.log("=== COMPANY CONTEXT updateCompany ===");
    console.log("ID to update:", id);
    console.log("Data to update with:", updatedData);
    console.log("Current companies BEFORE update:", companies);
    
    setCompanies(prevCompanies => {
      const updatedCompanies = prevCompanies.map(company => {
        // Use == for comparison (string vs number) and id_company
        if (company.id_company == id) {
          console.log("Found company to update:", company);
          const updatedCompany = {
            ...company,
            ...updatedData
          };
          console.log("Updated company will be:", updatedCompany);
          return updatedCompany;
        }
        return company;
      });
      
      console.log("Companies AFTER update:", updatedCompanies);
      return updatedCompanies;
    });
    
    console.log("Company update function completed");
  };

  const deleteCompany = (id) => {
    console.log("deleteCompany called for id:", id);
    setCompanies(prev => prev.filter(company => company.id_company != id));  // Use id_company and !=
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