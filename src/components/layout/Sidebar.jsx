import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Drawer,
  IconButton,
  
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";

const menuItems = [
  { text: "Dashboard", icon: "./assets/icons/dashboard.svg", path: "/dashboard" },
  { text: "Country", icon: "/assets/country/country.png", path: "/Country" },
  { text: "Company", icon: "/assets/company/company.png", path: "/Company" },
  { text: "Bus", icon: "/assets/bus/bus.png", path: "/Bus" },
  { text: "Driver", icon: "/assets/driver/driver.png", path: "/Driver" },
  { text: "Line", icon: "/assets/line/line.png", path: "/Line" },
  { text: "Stop", icon: "/assets/stop/stop.png", path: "/Stop" },
  { text: "Users", icon: "/assets/Users/user.png", path: "/Users" },
  { text: "Trip", icon: "/assets/trip/trip.png", path: "/Trip" },
  { text:  "BusTrip",icon: "/asset/BusTrip/BuaTrip.png", path:"/BusTrip"},
  { text: "Geolocation", icon: "/asset/Geolocation/Geolocation.png", path: "/Geolocation" },
  { text: "Alert", icon: "/asset/Alert/Alert.png", path: "/Alert" }
];


const Sidebar = ({ isMobile, mobileOpen, onClose }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? mobileOpen : true}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
  width: collapsed ? 60 : 230,
  flexShrink: 0,
  "& .MuiDrawer-paper": (theme) => ({
    width: collapsed ? 60 : 230,
    boxSizing: "border-box",
    backgroundColor:
      theme.palette.mode === "light" ? "#ffffff" : "#1e1e2f",
    display: "flex",
    flexDirection: "column",
    transition: "width 0.3s",
  }),
}}

    >
{/* Top: Logo + Collapse Button */}
<Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: collapsed ? "center" : "space-between",
  }}
>
  {!collapsed && (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        overflowX: "hidden",
      }}
    >
      <Box
        component="img"
        src="/assets/logo/logo.png" // replace with your new logo path
        alt="Ariivve"
        sx={{
          height: "100%",       // fixed height
          width: "100%",    // auto width to maintain aspect ratio
          objectFit: "contain",
        }}
      />
    </Box>
  )}
  
  <IconButton sx={{ mt: collapsed ? 0 : 1 }} onClick={toggleSidebar}>
    <MenuIcon />
  </IconButton>
</Box>


      {/* Menu */}
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={NavLink}
            to={item.path}
            onClick={() => {
              if (isMobile) onClose();
            }}
            sx={{
              mb: 0.5,
              mx: 1,
              borderRadius: 4,
              justifyContent: collapsed ? "center" : "flex-start",
              "& .MuiListItemIcon-root": {
                minWidth: 0,
                mr: collapsed ? 0 : 2,
              },
              "&.active": {
                backgroundColor: "#2962ff",
                color: "#fff",
                "& img": { filter: "brightness(1.2)" },
              },
            }}
          >
            <ListItemIcon>
              <Box component="img" src={item.icon} sx={{ width: 24, height: 24 }} />
            </ListItemIcon>
            {!collapsed && <ListItemText primary={item.text} />}
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
