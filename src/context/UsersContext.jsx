import React, { createContext, useState, useContext } from "react";

const UsersContext = createContext();

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};

export const UsersProvider = ({ children }) => {
  // Updated to match new field structure with realistic data
  const [users, setUsers] = useState([
    {
      id_user: 1,
      full_name: "John Smith",
      phone: "+1 (555) 123-4567",
      gender: "male",
      id_country: 1,
      preferred_line_id: "L12",
      current_latitude: "40.712776",
      current_longitude: "-74.005974",
      created_at: "2024-01-15T09:30:00Z",
      status: "active",
    },
    {
      id_user: 2,
      full_name: "Emma Johnson",
      phone: "+44 20 7946 0958",
      gender: "female",
      id_country: 2,
      preferred_line_id: "L08",
      current_latitude: "51.507351",
      current_longitude: "-0.127758",
      created_at: "2024-02-20T14:45:00Z",
      status: "active",
    },
    {
      id_user: 3,
      full_name: "Robert Chen",
      phone: "+86 10 6539 1847",
      gender: "male",
      id_country: 7,
      preferred_line_id: "L15",
      current_latitude: "39.904202",
      current_longitude: "116.407394",
      created_at: "2024-03-05T11:20:00Z",
      status: "inactive",
    },
    {
      id_user: 4,
      full_name: "Sarah Williams",
      phone: "+61 2 9374 4000",
      gender: "female",
      id_country: 4,
      preferred_line_id: "L03",
      current_latitude: "-33.868820",
      current_longitude: "151.209290",
      created_at: "2024-01-28T16:10:00Z",
      status: "active",
    },
    {
      id_user: 5,
      full_name: "Alex Taylor",
      phone: "+1 (555) 987-6543",
      gender: "other",
      id_country: 1,
      preferred_line_id: "L19",
      current_latitude: "34.052235",
      current_longitude: "-118.243683",
      created_at: "2024-02-10T13:25:00Z",
      status: "suspended",
    },
    {
      id_user: 6,
      full_name: "Maria Garcia",
      phone: "+34 91 123 4567",
      gender: "female",
      id_country: 6,
      preferred_line_id: "L07",
      current_latitude: "40.416775",
      current_longitude: "-3.703790",
      created_at: "2024-03-12T10:15:00Z",
      status: "active",
    },
    {
      id_user: 7,
      full_name: "David Müller",
      phone: "+49 30 12345678",
      gender: "male",
      id_country: 5,
      preferred_line_id: "L22",
      current_latitude: "52.520008",
      current_longitude: "13.404954",
      created_at: "2024-02-28T08:45:00Z",
      status: "active",
    },
    {
      id_user: 8,
      full_name: "Yuki Tanaka",
      phone: "+81 3 1234 5678",
      gender: "female",
      id_country: 7,
      preferred_line_id: "L14",
      current_latitude: "35.689487",
      current_longitude: "139.691711",
      created_at: "2024-01-05T17:30:00Z",
      status: "inactive",
    },
    {
      id_user: 9,
      full_name: "Michael Brown",
      phone: "+1 (555) 456-7890",
      gender: "male",
      id_country: 3,
      preferred_line_id: "L11",
      current_latitude: "43.653225",
      current_longitude: "-79.383186",
      created_at: "2024-03-18T12:00:00Z",
      status: "active",
    },
    {
      id_user: 10,
      full_name: "Sophie Martin",
      phone: "+33 1 40 20 50 50",
      gender: "female",
      id_country: 6,
      preferred_line_id: "L05",
      current_latitude: "48.856613",
      current_longitude: "2.352222",
      created_at: "2024-02-14T15:45:00Z",
      status: "active",
    },
  ]);

  const addUser = (newUser) => {
    const id_user = users.length > 0 ? Math.max(...users.map((u) => u.id_user)) + 1 : 1;
    
    // Set current timestamp for created_at if not provided
    const userWithDefaults = {
      ...newUser,
      id_user,
      created_at: newUser.created_at || new Date().toISOString(),
      status: newUser.status || "active",
    };

    setUsers([...users, userWithDefaults]);
    console.log("Added user:", userWithDefaults);
  };

  const updateUser = (id_user, updatedData) => {
    setUsers((prev) =>
      prev.map((user) => 
        user.id_user === id_user ? { ...user, ...updatedData } : user
      ),
    );
    console.log("Updated user ID:", id_user, "with data:", updatedData);
  };

  const deleteUser = (id_user) => {
    setUsers((prev) => prev.filter((user) => user.id_user !== id_user));
    console.log("Deleted user ID:", id_user);
  };

  // Helper function to get user by ID
  const getUserById = (id_user) => {
    return users.find(user => user.id_user === id_user);
  };

  const value = {
    users,
    addUser,
    updateUser,
    deleteUser,
    getUserById,
  };

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
};