import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Card,
  CardContent,
  useTheme,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import PersonIcon from "@mui/icons-material/Person";
import RouteIcon from "@mui/icons-material/Route";
import PlaceIcon from "@mui/icons-material/Place";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// IMPORT ALL YOUR REAL CONTEXTS HERE
import { useCompanies } from "../context/CompanyContext";
import { useLines } from "../context/LineContext";
import { useStops } from "../context/StopContext";
 import { useCountries } from "../context/CountryContext";
  import { useBuses } from "../context/BusContext";
import { useDrivers } from "../context/DriverContext";
 import { useUsers } from "../context/UsersContext";

const Dashboard = () => {
  const theme = useTheme();
  
  // GET REAL DATA FROM CONTEXTS
const { companies, deleteCompany } = useCompanies();
const { lines, deleteLine } = useLines();
const { stops, deleteStop } = useStops();
const { countries, deleteCountry } = useCountries();
const { buses, deleteBus } = useBuses();
const { drivers, deleteDriver } = useDrivers();
const { users, deleteUser } = useUsers();


const deleteHandlers = {
  Countries: deleteCountry,
  Companies: deleteCompany,
  Buses: deleteBus,
  Drivers: deleteDriver,
  Lines: deleteLine,
  Stops: deleteStop,
  Users: deleteUser,
};

const handleDelete = (moduleTitle, id) => {
  const confirmed = window.confirm(
    `Are you sure you want to delete this ${moduleTitle.slice(0, -1)}?`
  );

  if (!confirmed) return;

  const deleteFn = deleteHandlers[moduleTitle];
  if (deleteFn) {
    deleteFn(id);
  }
};

// ===== DERIVED DASHBOARD METRICS =====

// Modules
const totalModules = 7; // Countries, Companies, Buses, Drivers, Lines, Stops, Users

const activeModules = [
  countries.length,
  companies.length,
  buses.length,
  drivers.length,
  lines.length,
  stops.length,
  users.length,
].filter(count => count > 0).length;

// Drivers
const totalDrivers = drivers.length;

const onlineDrivers = drivers.filter(
  d => d.status?.toUpperCase() === "ONLINE"
).length;

const offlineDrivers = drivers.filter(
  d => d.status?.toUpperCase() === "OFFLINE"
).length;

// Buses

// Buses
const totalBuses = buses.length;

const activeBuses = buses.filter(b => b.status.toLowerCase() === "active").length;
const maintenanceBuses = buses.filter(b => b.status.toLowerCase() === "maintenance").length;
const outOfServiceBuses = buses.filter(b => b.status.toLowerCase() === "outofservice").length;






  // Summary card data
  const summaryCards = [
    {
      title: "Countries",
      count: countries.length,
      icon: <PeopleIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      color: theme.palette.primary.light,
      link: "/Country",
      data: countries, // Real data will come from useCountries()
    },
    {
      title: "Companies",
      count: companies.length,
      icon: <BusinessIcon sx={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      color: theme.palette.secondary.light,
      link: "/Company",
      data: companies, // REAL DATA from CompanyContext
    },
    {
      title: "Buses",
      count: buses.length,
      icon: <DirectionsBusIcon sx={{ fontSize: 40, color: theme.palette.success.main }} />,
      color: theme.palette.success.light,
      link: "/Bus",
      data: buses, // Will be real when BusContext created
    },
    {
      title: "Drivers",
      count: drivers.length,
      icon: <PersonIcon sx={{ fontSize: 40, color: theme.palette.warning.main }} />,
      color: theme.palette.warning.light,
      link: "/Driver",
      data: drivers, // Will be real when DriverContext created
    },
    {
      title: "Lines", 
      count: lines.length,
      icon: <RouteIcon sx={{ fontSize: 40, color: theme.palette.info.main }} />,
      color: theme.palette.info.light,
      link: "/Line",
      data: lines, // REAL DATA from LineContext
    },
    {
      title: "Stops",
      count: stops.length,
      icon: <PlaceIcon sx={{ fontSize: 40, color: theme.palette.error.main }} />,
      color: theme.palette.error.light,
      link: "/Stop",
      data: stops, // REAL DATA from StopContext
    },
    {
      title: "Users",
      count: users.length,
      icon: <AccountCircleIcon sx={{ fontSize: 40, color: theme.palette.grey[700] }} />,
      color: theme.palette.grey[300],
      link: "/Users",
      data: users, // Will be real when UsersContext created
    },
  ];

  // Function to get columns based on module
  const getColumns = (moduleTitle) => {
    switch(moduleTitle) {
      case "Countries":
        return [
          { key: "name", label: "Name" },
          { key: "code", label: "Code" },
        ];
      case "Companies":
        return [
          { key: "name", label: "Name" },
          { key: "contact", label: "Contact" },
          { key: "Email", label: "Email" },
        ];
      case "Buses":
        return [
          { key: "number", label: "number" },
          { key: "seat", label: "seat" },
          { key: "status", label: "Status" },
          { key: "model", label: "mofel"}
        ];
      case "Drivers":
        return [
          { key: "name", label: "Driver Name" },
          { key: "license", label: "License" },
          { key: "status", label: "Status" },
        ];
      case "Lines":
        return [
          { key: "name", label: "Line Name" },
          { key: "Email", label: "Email" },
          { key: "Role", label: "Role" },
        ];
      case "Stops":
        return [
          { key: "name", label: "Stop Name" },
          { key: "city", label: "City" },
          { key: "qr", label: "QR Code" },
        ];
      case "Users":
        return [
          { key: "name", label: " Name" },
          { key: "lastname", label: "lastname" },
          { key: "contact", label: "contact"},
          { key: "Email" , label: "Email"},
          { key: "license", label:"license"},
        ];
      default:
        return [{ key: "name", label: "Name" }];
    }
  };

  // Function to render a module table
  const renderModuleTable = (module) => {
    
    if (!module.data || module.data.length === 0) return null;

    const columns = getColumns(module.title);
    

    return (
      <Grid item xs={12} md={6} lg={4} key={module.title}>
        <Paper
          sx={{
            p: 2,
            borderRadius: 3,
            backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              Recent {module.title}
            </Typography>
            <Button
              component={Link}
              to={module.link}
              size="small"
              endIcon={<ArrowForwardIcon />}
              sx={{ textTransform: "none" }}
            >
              View All
            </Button>
          </Box>
          
          <TableContainer sx={{ flex: 1 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell key={col.key} sx={{ fontWeight: 600, fontSize: "0.875rem" }}>
                      {col.label}
                    </TableCell>
                  ))}
                  <TableCell sx={{ fontWeight: 600, fontSize: "0.875rem" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {module.data.slice(0, 4).map((item) => (
                  <TableRow key={item.id} hover>
                    {columns.map((col) => (
                      <TableCell key={col.key} sx={{ fontSize: "0.875rem" }}>
                        {item[col.key]}
                      </TableCell>
                    ))}
                    <TableCell>
                     <IconButton
  size="small"
  color="error"
  onClick={() => handleDelete(module.title, item.id)}
>
  <DeleteIcon fontSize="small" />
</IconButton>

                     
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="body2" color="textSecondary">
              Total: {module.data.length} items
            </Typography>
          </Box>
        </Paper>
      </Grid>
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="600">
          Dashboard Overview
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Welcome to your transportation management system
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {summaryCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card 
              component={Link}
              to={card.link}
              sx={{
                textDecoration: "none",
                borderRadius: 3,
                backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Box sx={{ backgroundColor: card.color, p: 1, borderRadius: 2 }}>
                    {card.icon}
                  </Box>
                  <Typography variant="h4" fontWeight="700">
                    {card.count}
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight="600">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  Click to manage {card.title.toLowerCase()}
                  
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
        }}
      >
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4} md={2}>
            <Button
              component={Link}
              to="/Country/add"
              variant="contained"
              fullWidth
              sx={{ borderRadius: 2, py: 1.5 }}
            >
              Add Country
            </Button>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Button
            
              component={Link}
              to="/Company/add"
              variant="contained"
              fullWidth
              sx={{ borderRadius: 2, py: 1.5 }}
            >
              Add Company
            </Button>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Button
              component={Link}
              to="/Bus/add"
              variant="contained"
              fullWidth
              sx={{ borderRadius: 2, py: 1.5 }}
            >
              Add Bus
            </Button>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Button
              component={Link}
              to="/Driver/add"
              variant="contained"
              fullWidth
              sx={{ borderRadius: 2, py: 1.5 }}
            >
              Add Driver
            </Button>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Button
              component={Link}
              to="/Line/add"
              variant="contained"
              fullWidth
              sx={{ borderRadius: 2, py: 1.5 }}
            >
              Add Line
            </Button>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Button
              component={Link}
              to="/Stop/add"
              variant="contained"
              fullWidth
              sx={{ borderRadius: 2, py: 1.5 }}
            >
              Add Stop
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Recent Items Tables */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        Recent Items
      </Typography>
      
      <Grid container spacing={3}>
        {summaryCards.map((module) => renderModuleTable(module))}
        {}
      </Grid>

     

      {/* Statistics Section */}
     {/* Statistics Section */}
<Paper
  sx={{
    mt: 4,
    p: 3,
    borderRadius: 3,
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
  }}
>
  <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
    System Statistics
  </Typography>

  <Grid container spacing={3}>
    {/* TOTAL MODULES */}
    <Grid item xs={12} sm={6} md={3}>
      <Paper sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
        <Typography variant="h3" fontWeight="700" color="primary">
          {totalModules}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Total Modules
        </Typography>

        <Typography
          variant="body2"
          sx={{ mt: 1, color: "success.main", fontWeight: 600 }}
        >
          Active: {activeModules}
        </Typography>
      </Paper>
    </Grid>

    {/* DRIVERS */}
    <Grid item xs={12} sm={6} md={3}>
      <Paper sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
        <Typography variant="h3" fontWeight="700" color="success">
          {totalDrivers}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Total Drivers
        </Typography>

        <Typography variant="body2" sx={{ mt: 1, color: "success.main" }}>
          Online: {onlineDrivers}
        </Typography>
        <Typography variant="body2" sx={{ color: "error.main" }}>
          Offline: {offlineDrivers}
        </Typography>
      </Paper>
    </Grid>

    {/* BUSES */}
    <Grid item xs={12} sm={6} md={3}>
      <Paper sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
        <Typography variant="h3" fontWeight="700" color="warning">
          {totalBuses}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Total Buses
        </Typography>

        <Typography variant="body2" sx={{ mt: 1, color: "success.main" }}>
          Active: {activeBuses}
        </Typography>
        <Typography variant="body2" sx={{ color: "warning.main" }}>
          Maintenance: {maintenanceBuses}
        </Typography>
        <Typography variant="body2" sx={{ color: "error.main" }}>
          Out of Service: {outOfServiceBuses}
        </Typography>
      </Paper>
    </Grid>

    {/* YOU CAN ADD MORE CARDS HERE IF NEEDED */}
  </Grid>
</Paper>

    </Box>
  );
};

export default Dashboard;