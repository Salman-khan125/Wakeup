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
  { text: "Dashboard", icon: "/src/assets/icons/dashboard.svg", path: "/dashboard" },
  { text: "Country", icon: "/src/assets/sidebar/country.png", path: "/Country" },
  { text: "Company", icon: "/src/assets/sidebar/company.png", path: "/Company" },
  { text: "Bus", icon: "/src/assets/sidebar/bus.png", path: "/Bus" },
  { text: "Driver", icon: "/src/assets/sidebar/driver.png", path: "/Driver" },
  { text: "Line", icon: "/src/assets/sidebar/line.png", path: "/Line" },
  { text: "Stop", icon: "/src/assets/sidebar/stop.png", path: "/Stop" },
  { text: "Users", icon: "/src/assets/sidebar/user.png", path: "/Users" },
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
        "& .MuiDrawer-paper": {
          width: collapsed ? 60 : 230,
          boxSizing: "border-box",
          backgroundColor: "background.paper",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.3s",
        },
      }}
    >
      {/* Top: Logo + Collapse Button */}
      <Box
        sx={{
          p: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
        }}
      >
        {!collapsed && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, overflowX: "hidden" }}>
            <Box
              component="img"
              src="/src/assets/sidebar/logo.png"
              alt="Wakeup"
              sx={{ width: 90, height: 50 }}
            />
            <Box>
              <Typography variant="h6">Wakeup</Typography>
              <Typography variant="body2" color="text.secondary">
                Admin
              </Typography>
            </Box>
          </Box>
        )}
        <IconButton onClick={toggleSidebar}>
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
