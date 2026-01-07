import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alley", lastname: "Jhone", contact: "+00*******", Email: "AlleyJhone@gmail.com", license: "0947563", status: "online" },
    { id: 2, name: "Alley", lastname: "Jhone", contact: "+00*******", Email: "AlleyJhone@gmail.com", license: "0947563", status: "online" },
    { id: 3, name: "Alley", lastname: "Jhone", contact: "+00*******", Email: "AlleyJhone@gmail.com", license: "0947563", status: "offline" },
    { id: 4, name: "Alley", lastname: "Jhone", contact: "+00*******", Email: "AlleyJhone@gmail.com", license: "0947563", status: "online" },
    { id: 5, name: "Alley", lastname: "Jhone", contact: "+00*******", Email: "AlleyJhone@gmail.com", license: "0947563", status: "offline" },
    { id: 6, name: "Alley", lastname: "Jhone", contact: "+00*******", Email: "AlleyJhone@gmail.com", license: "0947563", status: "online" },
  ]);

  const addUser = (newUser) => {
    const id = users.length > 0 
      ? Math.max(...users.map(u => u.id)) + 1 
      : 1;
    
    setUsers([...users, { ...newUser, id }]);
    console.log("Added user:", newUser);
  };

  const updateUser = (id, updatedData) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === id ? { ...user, ...updatedData } : user
      )
    );
    console.log("Updated user ID:", id, "with data:", updatedData);
  };

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    console.log("Deleted user ID:", id);
  };

  const value = {
    users,
    addUser,
    updateUser,
    deleteUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};