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
import Country from "./pages/Country";
import Company from "./pages/company";
import Bus from "./pages/Bus";
import Driver from "./pages/Driver";
import Line from "./pages/Line";
import Stop from "./pages/Stop";
import Users from "./pages/Users";

function App({ toggleTheme, mode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
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
          flexGrow: 1,
          p: 3,
          mt: isMobile ? 8 : 0, // offset for AppBar
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
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="/Country" element={<Country />} />
          <Route path="/Company" element={<Company />} />
          <Route path="/Bus" element={<Bus />} />
          <Route path="/Driver" element={<Driver />} />
          <Route path="/Line" element={<Line />} />
          <Route path="/Stop" element={<Stop />} />
          <Route path="/Users" element={<Users />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
