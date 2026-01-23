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
import NotificationsIcon from "@mui/icons-material/Notifications";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import ScheduleIcon from "@mui/icons-material/Schedule";

// IMPORT ALL YOUR REAL CONTEXTS HERE
import { useCompanies } from "../context/CompanyContext";
import { useLines } from "../context/LineContext";
import { useStops } from "../context/StopContext";
import { useCountries } from "../context/CountryContext";
import { useBuses } from "../context/BusContext";
import { useDrivers } from "../context/DriverContext";
import { useUsers } from "../context/UsersContext";
import { useTrips } from "../context/TripContext";
import { useBusTrips } from "../context/BusTripContext";
import { useGeolocations } from "../context/GeolocationContext";
import { useAlerts } from "../context/AlertContext";

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
  const { trips, deleteTrip: deleteTripContext } = useTrips();
  const { busTrips, deleteBusTrip } = useBusTrips();
  const { geolocations, deleteGeolocation } = useGeolocations();
  const { alerts, deleteAlert } = useAlerts();

  const deleteHandlers = {
    Countries: deleteCountry,
    Companies: deleteCompany,
    Buses: deleteBus,
    Drivers: deleteDriver,
    Lines: deleteLine,
    Stops: deleteStop,
    Users: deleteUser,
    Trips: deleteTripContext,
    BusTrips: deleteBusTrip,
    Geolocations: deleteGeolocation,
    Alerts: deleteAlert,
  };

  const handleDelete = (moduleTitle, id) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this ${moduleTitle.slice(0, -1)}?`,
    );

    if (!confirmed) return;

    const deleteFn = deleteHandlers[moduleTitle];
    if (deleteFn) {
      deleteFn(id);
    }
  };

  // ===== DERIVED DASHBOARD METRICS =====

  // Modules count
  const totalModules = 11;

  const activeModules = [
    countries.length,
    companies.length,
    buses.length,
    drivers.length,
    lines.length,
    stops.length,
    users.length,
    trips.length,
    busTrips.length,
    geolocations.length,
    alerts.length,
  ].filter((count) => count > 0).length;

  // Drivers
  const totalDrivers = drivers.length;
  const onlineDrivers = drivers.filter(
    (d) => d.status?.toUpperCase() === "ONLINE ",
  ).length;
  const offlineDrivers = drivers.filter(
    (d) => d.status?.toUpperCase() === "OFFLINE",
  ).length;

  // Buses
  const totalBuses = buses.length;
  const activeBuses = buses.filter((b) => {
    const status = (b.status || "").toLowerCase();
    return status === "active";
  }).length;
  const maintenanceBuses = buses.filter((b) => {
    const status = (b.status || "").toLowerCase();
    return status === "maintenance";
  }).length;
  const outOfServiceBuses = buses.filter((b) => {
    const status = (b.status || "").toLowerCase();
    return status === "out of service" || status === "outofservice";
  }).length;

  // Summary card data
  const summaryCards = [
    {
      title: "Countries",
      count: countries.length,
      icon: (
        <PeopleIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
      ),
      color: theme.palette.primary.light,
      link: "/Country",
      data: countries,
    },
    {
      title: "Companies",
      count: companies.length,
      icon: (
        <BusinessIcon
          sx={{ fontSize: 40, color: theme.palette.secondary.main }}
        />
      ),
      color: theme.palette.secondary.light,
      link: "/Company",
      data: companies,
    },
    {
      title: "Buses",
      count: buses.length,
      icon: (
        <DirectionsBusIcon
          sx={{ fontSize: 40, color: theme.palette.success.main }}
        />
      ),
      color: theme.palette.success.light,
      link: "/Bus",
      data: buses,
    },
    {
      title: "Drivers",
      count: drivers.length,
      icon: (
        <PersonIcon sx={{ fontSize: 40, color: theme.palette.warning.main }} />
      ),
      color: theme.palette.warning.light,
      link: "/Driver",
      data: drivers,
    },
    {
      title: "Lines",
      count: lines.length,
      icon: <RouteIcon sx={{ fontSize: 40, color: theme.palette.info.main }} />,
      color: theme.palette.info.light,
      link: "/Line",
      data: lines,
    },
    {
      title: "Stops",
      count: stops.length,
      icon: (
        <PlaceIcon sx={{ fontSize: 40, color: theme.palette.error.main }} />
      ),
      color: theme.palette.error.light,
      link: "/Stop",
      data: stops,
    },
    {
      title: "Users",
      count: users.length,
      icon: (
        <AccountCircleIcon
          sx={{ fontSize: 40, color: theme.palette.grey[700] }}
        />
      ),
      color: theme.palette.grey[300],
      link: "/Users",
      data: users,
    },
    {
      title: "Trips",
      count: trips.length,
      icon: (
        <TripOriginIcon sx={{ fontSize: 40, color: theme.palette.info.main }} />
      ),
      color: "#e3f2fd",
      link: "/Trip",
      data: trips,
    },
    {
      title: "BusTrips",
      count: busTrips.length,
      icon: (
        <ScheduleIcon
          sx={{ fontSize: 40, color: theme.palette.success.dark }}
        />
      ),
      color: "#e8f5e9",
      link: "/BusTrip",
      data: busTrips,
    },
    {
      title: "Geolocations",
      count: geolocations.length,
      icon: (
        <GpsFixedIcon
          sx={{ fontSize: 40, color: theme.palette.warning.dark }}
        />
      ),
      color: "#fff8e1",
      link: "/Geolocation",
      data: geolocations,
    },
    {
      title: "Alerts",
      count: alerts.length,
      icon: (
        <NotificationsIcon
          sx={{ fontSize: 40, color: theme.palette.error.dark }}
        />
      ),
      color: "#ffebee",
      link: "/Alert",
      data: alerts,
    },
  ];

  // Function to get columns based on module
  const getColumns = (moduleTitle) => {
    switch (moduleTitle) {
      case "Countries":
        return [
          { key: "name", label: "Name" },
          { key: "code", label: "Code" },
          { key: "region", label: "Region" },
        ];
      case "Companies":
        return [
          { key: "company_name", label: "Name" },
          { key: "phone", label: "phone" },
          { key: "Email", label: "Email" },
          { key: "transport_type", label: "Transport Type" },
        ];
      case "Buses":
        return [
          { key: "plate_number", label: "Bus Number" },
          { key: "capacity", label: "Seats" },
          { key: "status", label: "Status" },
          { key: "model", label: "Model" },
        ];
      case "Drivers":
        return [
          { key: "first_name", label: "Driver Name" },
          { key: "phone", label: "Phone" },
          { key: "Email", label: "Email" },
          { key: "license", label: "License No" },
          { key: "status", label: "Status" },
        ];
      case "Lines":
        return [
          { key: "line_name", label: "Line Name" },
          { key: "distance_km", label: "Distance" },
          { key: "description", label: "Desription" },
          { key: "id_company", label: "Company ID" },
        ];
      case "Stops":
        return [
          { key: "stop_name", label: "Stop Name" },
          { key: "latitude ", label: "Latitude" },
          { key: "longitude", label: "Longitude" },
          { key: "city", label: "City" },
          { key: "id_country", label: "Country ID" },
        ];
      case "Users":
        return [
          { key: "full_name", label: "Name" },
          { key: "phone", label: "phone" },
          { key: "gender", label: "Gender" },
          { key : "status", label: "status" },
        ];
      case "Trips":
        return [
          
          { key: "direction", label: "Direction" },
          { key: "scheduled_departure", label: "Departure Time" },
          {key : "scheduled_arrival", label: "Arival Time" },
         
          
        ];
      case "BusTrips":
        return [
          { key: "id_bus_trip", label: "ID" },
          { key: "id_trip", label: "Trip ID" },
          { key: "id_bus", label: "Bus ID" },
        ];
      case "Geolocations":
        return [
          { key: "id_geolocation", label: "ID" },
          { key: "latitude", label: "Latitude" },
          { key: "longitude", label: "Longitude" },
        ];
      case "Alerts":
        return [
          { key: "id_alert", label: "ID" },
          { key: "alert_type", label: "Type" },
          { key: "status", label: "Status" },
          { key: "message", label: "Message" },
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
            backgroundColor:
              theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
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
                    <TableCell
                      key={col.key}
                      sx={{ fontWeight: 600, fontSize: "0.875rem" }}
                    >
                      {col.label}
                    </TableCell>
                  ))}
                  <TableCell sx={{ fontWeight: 600, fontSize: "0.875rem" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {module.data.slice(0, 4).map((item) => (
                  <TableRow
                    key={
                      item.id ||
                      item.id_trip ||
                      item.id_alert ||
                      item.id_geolocation
                    }
                    hover
                  >
                    {columns.map((col) => (
                      <TableCell key={col.key} sx={{ fontSize: "0.875rem" }}>
                        {item[col.key]}
                      </TableCell>
                    ))}
                    <TableCell>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() =>
                          handleDelete(
                            module.title,
                            item.id ||
                              item.id_trip ||
                              item.id_alert ||
                              item.id_geolocation,
                          )
                        }
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="primary"
                        component={Link}
                        to={`${module.link}/edit/${item.id || item.id_trip || item.id_alert || item.id_geolocation}`}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              mt: 2,
              pt: 2,
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          >
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
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <Card
              component={Link}
              to={card.link}
              sx={{
                textDecoration: "none",
                borderRadius: 3,
                backgroundColor:
                  theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1.5,
                  }}
                >
                  <Box
                    sx={{ backgroundColor: card.color, p: 1, borderRadius: 2 }}
                  >
                    {card.icon}
                  </Box>
                  <Typography variant="h4" fontWeight="700">
                    {card.count}
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  fontWeight="600"
                  sx={{ fontSize: "1rem" }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mt: 0.5, fontSize: "0.75rem" }}
                >
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
          <Grid item xs={6} sm={4} md={2}>
            <Button
              component={Link}
              to="/Trip/add"
              variant="contained"
              fullWidth
              sx={{ borderRadius: 2, py: 1.5 }}
            >
              Add Trip
            </Button>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Button
              component={Link}
              to="/BusTrip/add"
              variant="contained"
              fullWidth
              sx={{ borderRadius: 2, py: 1.5 }}
            >
              Add BusTrip
            </Button>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Button
              component={Link}
              to="/Geolocation/add"
              variant="contained"
              fullWidth
              sx={{ borderRadius: 2, py: 1.5 }}
            >
              Add Geolocation
            </Button>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Button
              component={Link}
              to="/Alert/add"
              variant="contained"
              fullWidth
              sx={{ borderRadius: 2, py: 1.5 }}
            >
              Add Alert
            </Button>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Button
              component={Link}
              to="/Users/add"
              variant="contained"
              fullWidth
              sx={{ borderRadius: 2, py: 1.5 }}
            >
              Add User
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
          <Grid item xs={12} sm={6} md={3} lg={2.4}>
            <Paper sx={{ p: 2, textAlign: "center", borderRadius: 3, height: '100%' }}>
              <Typography variant="h4" fontWeight="700" color="primary">
                {totalModules}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
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
          <Grid item xs={12} sm={6} md={3} lg={2.4}>
            <Paper sx={{ p: 2, textAlign: "center", borderRadius: 3, height: '100%' }}>
              <Typography variant="h4" fontWeight="700" color="success.main">
                {totalDrivers}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
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
          <Grid item xs={12} sm={6} md={3} lg={2.4}>
            <Paper sx={{ p: 2, textAlign: "center", borderRadius: 3, height: '100%' }}>
              <Typography variant="h4" fontWeight="700" color="warning.main">
                {totalBuses}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
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

          {/* TRIPS STATISTICS */}
          <Grid item xs={12} sm={6} md={3} lg={2.4}>
            <Paper sx={{ p: 2, textAlign: "center", borderRadius: 3, height: '100%' }}>
              <Typography variant="h4" fontWeight="700" color="info.main">
                {trips.length}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Total Trips
              </Typography>
              {trips.length > 0 && (
                <>
                  <Typography variant="body2" sx={{ mt: 1, color: "success.main" }}>
                    Active: {trips.filter(t => t.status?.toLowerCase() === 'active').length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "warning.main" }}>
                    Completed: {trips.filter(t => t.status?.toLowerCase() === 'completed').length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "info.main" }}>
                    Scheduled: {trips.filter(t => t.status?.toLowerCase() === 'scheduled').length}
                  </Typography>
                </>
              )}
            </Paper>
          </Grid>

          {/* BUS TRIPS STATISTICS */}
          <Grid item xs={12} sm={6} md={3} lg={2.4}>
            <Paper sx={{ p: 2, textAlign: "center", borderRadius: 3, height: '100%' }}>
              <Typography variant="h4" fontWeight="700" color="secondary.main">
                {busTrips.length}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Bus Trips
              </Typography>
              {busTrips.length > 0 && (
                <>
                  <Typography variant="body2" sx={{ mt: 1, color: "success.main" }}>
                    Assigned Buses: {[...new Set(busTrips.map(bt => bt.id_bus))].length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "info.main" }}>
                    Active Trips: {busTrips.filter(bt => {
                      const trip = trips.find(t => t.id_trip === bt.id_trip);
                      return trip?.status?.toLowerCase() === 'active';
                    }).length}
                  </Typography>
                </>
              )}
            </Paper>
          </Grid>

          {/* ALERTS */}
          <Grid item xs={12} sm={6} md={3} lg={2.4}>
            <Paper sx={{ p: 2, textAlign: "center", borderRadius: 3, height: '100%' }}>
              <Typography variant="h4" fontWeight="700" color="error.main">
                {alerts.length}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Total Alerts
              </Typography>
              {alerts.length > 0 && (
                <>
                  <Typography variant="body2" sx={{ mt: 1, color: "error.main" }}>
                    New: {alerts.filter((a) => a.status === "new").length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "warning.main" }}>
                    In Progress: {alerts.filter((a) => a.status === "in_progress").length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "success.main" }}>
                    Resolved: {alerts.filter((a) => a.status === "resolved").length}
                  </Typography>
                </>
              )}
            </Paper>
          </Grid>

          {/* GEOLOCATIONS */}
          <Grid item xs={12} sm={6} md={3} lg={2.4}>
            <Paper sx={{ p: 2, textAlign: "center", borderRadius: 3, height: '100%' }}>
              <Typography variant="h4" fontWeight="700" color="warning.dark">
                {geolocations.length}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Geolocations
              </Typography>
              {geolocations.length > 0 && (
                <>
                  <Typography variant="body2" sx={{ mt: 1, color: "info.main" }}>
                    Last 24h: {geolocations.filter(g => {
                      const created = new Date(g.created_at || g.timestamp);
                      const now = new Date();
                      const diffHours = (now - created) / (1000 * 60 * 60);
                      return diffHours <= 24;
                    }).length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "success.main" }}>
                    Active Today: {geolocations.filter(g => {
                      const date = new Date(g.created_at || g.timestamp);
                      const today = new Date();
                      return date.toDateString() === today.toDateString();
                    }).length}
                  </Typography>
                </>
              )}
            </Paper>
          </Grid>

          {/* COMPANIES */}
          <Grid item xs={12} sm={6} md={3} lg={2.4}>
            <Paper sx={{ p: 2, textAlign: "center", borderRadius: 3, height: '100%' }}>
              <Typography variant="h4" fontWeight="700" color="secondary.dark">
                {companies.length}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Companies
              </Typography>
              {companies.length > 0 && (
                <>
                  <Typography variant="body2" sx={{ mt: 1, color: "success.main" }}>
                    Active: {companies.filter(c => c.status?.toLowerCase() === 'active').length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "info.main" }}>
                    Total Buses: {buses.filter(b => companies.some(c => c.id === b.company_id)).length}
                  </Typography>
                </>
              )}
            </Paper>
          </Grid>

          {/* LINES */}
          <Grid item xs={12} sm={6} md={3} lg={2.4}>
            <Paper sx={{ p: 2, textAlign: "center", borderRadius: 3, height: '100%' }}>
              <Typography variant="h4" fontWeight="700" color="info.dark">
                {lines.length}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Lines
              </Typography>
              {lines.length > 0 && (
                <>
                  <Typography variant="body2" sx={{ mt: 1, color: "success.main" }}>
                    Active: {lines.filter(l => l.status?.toLowerCase() === 'active').length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "info.main" }}>
                    Stops: {stops.length}
                  </Typography>
                </>
              )}
            </Paper>
          </Grid>

          {/* USERS */}
          <Grid item xs={12} sm={6} md={3} lg={2.4}>
            <Paper sx={{ p: 2, textAlign: "center", borderRadius: 3, height: '100%' }}>
              <Typography variant="h4" fontWeight="700" color="grey.700">
                {users.length}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Users
              </Typography>
              {users.length > 0 && (
                <>
                  <Typography variant="body2" sx={{ mt: 1, color: "info.main" }}>
                    Admins: {users.filter(u => u.role?.toLowerCase() === 'admin').length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "success.main" }}>
                    Drivers: {users.filter(u => u.role?.toLowerCase() === 'driver').length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "warning.main" }}>
                    Operators: {users.filter(u => u.role?.toLowerCase() === 'operator').length}
                  </Typography>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* SYSTEM STATUS INDICATORS */}
        <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            System Health
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                p: 2, 
                borderRadius: 1,
                bgcolor: alerts.length > 0 ? 
                  (alerts.filter(a => a.status === 'new').length > 3 ? 
                    'error.light' : 'warning.light') : 
                  'success.light'
              }}>
                <Box sx={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: '50%', 
                  mr: 2,
                  bgcolor: alerts.length > 0 ? 
                    (alerts.filter(a => a.status === 'new').length > 3 ? 
                      'error.main' : 'warning.main') : 
                    'success.main'
                }} />
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    Alert Status: {alerts.filter(a => a.status === 'new').length > 3 ? 
                      'Critical' : 
                      alerts.length > 0 ? 'Warning' : 'Normal'}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {alerts.filter(a => a.status === 'new').length} new alerts
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                p: 2, 
                borderRadius: 2,
                bgcolor: maintenanceBuses > totalBuses * 0.2 ? 
                  'warning.light' : 'success.light'
              }}>
                <Box sx={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: '50%', 
                  mr: 2,
                  bgcolor: maintenanceBuses > totalBuses * 0.2 ? 
                    'warning.main' : 'success.main'
                }} />
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    Fleet Health: {maintenanceBuses > totalBuses * 0.2 ? 
                      'Needs Attention' : 'Good'}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {maintenanceBuses} buses in maintenance
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                p: 2, 
                borderRadius: 2,
                bgcolor: offlineDrivers > totalDrivers * 0.3 ? 
                  'warning.light' : 'success.light'
              }}>
                <Box sx={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: '50%', 
                  mr: 2,
                  bgcolor: offlineDrivers > totalDrivers * 0.3 ? 
                    'warning.main' : 'success.main'
                }} />
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    Driver Availability: {offlineDrivers > totalDrivers * 0.3 ? 
                      'Low' : 'Good'}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {onlineDrivers} online / {offlineDrivers} offline
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
