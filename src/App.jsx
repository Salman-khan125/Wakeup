import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Country from "./pages/Country";
import Company from "./pages/Company"; // This component has its own data
import Bus from "./pages/Bus";
import Driver from "./pages/Driver";
import Line from "./pages/Line";
import Stop from "./pages/Stop";
import Users from "./pages/Users";
import Trip from "./pages/Trip";
import BusTrip from "./pages/BusTrip";
import Geolocation from "./pages/Geolocation";
import Alert from "./pages/Alert";
import Login from "./pages/Login";

import AddCountry from "./add/AddCountry";
import AddCompany from "./add/AddCompany";
import AddBus from "./add/AddBus";
import AddDriver from "./add/AddDriver";
import AddLine from "./add/AddLine";
import AddStop from "./add/AddStop";
import AddUsers from "./add/AddUsers";
import AddTrip from "./add/AddTrip";
import AddBusTrip from "./add/AddBusTrip";
import AddGeolocation from "./add/AddGeolocation";
import AddAlert from "./add/AddAlert";

import EditCompany from "./EditForms/EditCompany";
import EditCountry from "./EditForms/EditCountry";
import EditBus from "./EditForms/EditBus";
import EditDriver from "./EditForms/EditDriver";
import EditLine from "./EditForms/EditLine";
import EditStop from "./EditForms/EditStop";
import EditUsers from "./EditForms/EditUsers";
import EditTrip from "./EditForms/EditTrip";
import EditBusTrip from "./EditForms/EditBusTrip";
import EditGeolocation from "./EditForms/EditGeolocation";
import EditAlert from "./EditForms/EditAlert";


function App({ toggleTheme, mode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  // REMOVE THIS if your Company component has its own data
  // const [companies, setCompanies] = useState(initialCompanies);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Mobile AppBar */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            borderRadius: "12px",
            margin: 1,
            width: "calc(100% - 16px)",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Dashboard</Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isMobile={isMobile}
        toggleTheme={toggleTheme}
        mode={mode}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          minWidth: 0,
          overflowX: "hidden",
          flexGrow: 1,
          p: 3,
          mt: isMobile ? 8 : 0,
        }}
      >
        <Box
          sx={{
            position: "fixed",
            top: 16,
            right: 16,
            zIndex: 1300,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <IconButton onClick={toggleTheme}>
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
          <Typography variant="body2">
            {mode === "light" ? "Dark Mode" : "Light Mode"}
          </Typography>
        </Box>

        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Country" element={<Country />} />
          <Route path="/Country/add" element={<AddCountry />} />
          <Route path="/Country/edit/:id" element={<EditCountry />} />
          <Route path="/Company/edit/:id" element={<EditCompany />} />
          <Route path="/Company" element={<Company />} />
          <Route path="/Company/add" element={<AddCompany />} />
          <Route path="/Bus" element={<Bus />} />
          <Route path="/Bus/add" element={<AddBus />} />
          <Route path="/Bus/edit/:id" element={<EditBus />} />
          <Route path="/Driver" element={<Driver />} />
          <Route path="/Driver/add" element={<AddDriver />} />
          <Route path="/Driver/edit/:id" element={<EditDriver />} />
          <Route path="/Line" element={<Line />} />
          <Route path="/Line/add" element={<AddLine />} />
          <Route path="/Line/edit/:id" element={<EditLine />} />
          <Route path="/Login" element={<Login />} />
          

          <Route path="/Stop" element={<Stop />} />
          <Route path="/Stop/add" element={<AddStop />} />
          <Route path="/Stop/edit/:id" element={<EditStop />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/Users/add" element={<AddUsers />} />
          <Route path="/Users/edit/:id" element={<EditUsers />} />
          <Route path="/Trip" element={<Trip />} />
          <Route path="/Trip/add" element={<AddTrip />} />
          <Route path="/Trip/edit/:id" element={<EditTrip />} />
          <Route path="/BusTrip" element={<BusTrip />} />
          <Route path="/BusTrip/add" element={<AddBusTrip />} />
          <Route path="/BusTrip/edit/:id" element={<EditBusTrip />} />
          <Route path="/Geolocation" element={<Geolocation />} />
          <Route path="/Geolocation/add" element={<AddGeolocation />} />
          <Route path="/Geolocation/edit/:id" element={<EditGeolocation />} />
          <Route path="/Alert" element={<Alert />} />
          <Route path="/Alert/add" element={<AddAlert />} />
          <Route path="/Alert/edit/:id" element={<EditAlert />} />
          
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
