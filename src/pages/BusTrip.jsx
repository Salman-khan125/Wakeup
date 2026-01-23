import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Pagination,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useBusTrips } from "../context/BusTripContext";

const PAGE_SIZE = 4;

const BusTrip = () => {
  const theme = useTheme();
  
  // GET DATA FROM CONTEXT
  const { busTrips, deleteBusTrip } = useBusTrips();
  
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id_bus_trip) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this bus trip?"
    );
    if (!confirmed) return;

    // USE CONTEXT FUNCTION
    deleteBusTrip(id_bus_trip);

    if ((page - 1) * PAGE_SIZE >= busTrips.length - 1) {
      setPage((p) => Math.max(p - 1, 1));
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return dateString;
    }
  };

  // Helper function to format time
  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    try {
      const [hours, minutes] = timeString.split(":");
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      return timeString;
    }
  };

  // Status display mapping
  const STATUS_DISPLAY = {
    in_service: { label: "In Service", color: "success" },
    paused: { label: "Paused", color: "warning" },
    completed: { label: "Completed", color: "info" },
  };

  // SEARCH FUNCTIONALITY
  const filteredBusTrips = busTrips.filter(busTrip => {
    const searchLower = searchTerm.toLowerCase();
    const busId = (busTrip.id_bus || "").toString().toLowerCase();
    const tripId = (busTrip.id_trip || "").toString().toLowerCase();
    const serviceDate = formatDate(busTrip.service_date).toLowerCase();
    const status = (STATUS_DISPLAY[busTrip.status]?.label || "").toLowerCase();
    const departure = formatTime(busTrip.actual_departure).toLowerCase();
    
    return busId.includes(searchLower) ||
           tripId.includes(searchLower) ||
           serviceDate.includes(searchLower) ||
           status.includes(searchLower) ||
           departure.includes(searchLower);
  });

  const currentBusTrips = filteredBusTrips.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageCount = Math.ceil(filteredBusTrips.length / PAGE_SIZE);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header - Same structure as Trip */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Bus Trip
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Information about your current plan and usages
        </Typography>
      </Box>

      {/* Search + Add - Same structure as Trip */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
          backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
        }}
      >
        <TextField
          placeholder="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            flex: 1,
            minWidth: 200,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />
        <Button
          component={Link}
          to="/BusTrip/add"
          variant="contained"
          sx={{ height: 40, borderRadius: 3 }}
        >
          + Add
        </Button>
      </Box>

      {/* Main Table - Using BusTrip data */}
      <TableContainer
        component={Paper}
        sx={{
          mb: 2,
          borderRadius: 2,
          overflowX: "auto",
          backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                #
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Bus ID
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Trip ID
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Service Date
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Actual Departure
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentBusTrips.map((busTrip) => (
              <TableRow
                key={busTrip.id_bus_trip}
                sx={{
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "light" ? "#f5f5f5" : "#2c2c3e",
                  },
                }}
              >
                <TableCell>{busTrip.id_bus_trip}</TableCell>
                <TableCell>{busTrip.id_bus}</TableCell>
                <TableCell>{busTrip.id_trip}</TableCell>
                <TableCell>{formatDate(busTrip.service_date)}</TableCell>
                <TableCell>{formatTime(busTrip.actual_departure)}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "inline-block",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      backgroundColor:
                        busTrip.status === "in_service" ? "#e8f5e9" :
                        busTrip.status === "paused" ? "#fff3e0" :
                        "#e3f2fd",
                      color:
                        busTrip.status === "in_service" ? "#2e7d32" :
                        busTrip.status === "paused" ? "#f57c00" :
                        "#1565c0",
                      fontWeight: 500,
                      fontSize: "0.75rem",
                    }}
                  >
                    {STATUS_DISPLAY[busTrip.status]?.label || busTrip.status}
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/BusTrip/edit/${busTrip.id_bus_trip}`}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(busTrip.id_bus_trip)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination - Same as Trip */}
      {pageCount > 1 && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        </Box>
      )}

      {/* BusTrip Display List - Same structure as Trip */}
      <Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          BusTrip Display
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            overflowX: "auto",
            backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 50 }}>#</TableCell>
                <TableCell
                  sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                >
                  List
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentBusTrips.map((busTrip) => (
                <TableRow key={busTrip.id_bus_trip}>
                  <TableCell>{busTrip.id_bus_trip}</TableCell>
                  <TableCell>
                    Bus {busTrip.id_bus} - Trip {busTrip.id_trip} ({formatDate(busTrip.service_date)})
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default BusTrip;