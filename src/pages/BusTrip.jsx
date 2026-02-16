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
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useBusTrips } from "../context/BusTripContext";

const PAGE_SIZE = 4;

const BusTrip = () => {
  const theme = useTheme();
  const { busTrips, deleteBusTrip } = useBusTrips();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id_bus_trip) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this bus trip?"
    );
    if (!confirmed) return;

    deleteBusTrip(id_bus_trip);

    if ((page - 1) * PAGE_SIZE >= busTrips.length - 1) {
      setPage((p) => Math.max(p - 1, 1));
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  // FORMAT DATE
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  // FORMAT TIME
  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    try {
      const [hours, minutes] = timeString.split(":");
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return timeString;
    }
  };

  const STATUS_DISPLAY = {
    in_service: { label: "In Service" },
    paused: { label: "Paused" },
    completed: { label: "Completed" },
  };

  // SEARCH (UNCHANGED LOGIC)
  const filteredBusTrips = busTrips.filter((busTrip) => {
    const searchLower = searchTerm.toLowerCase();
    const busId = (busTrip.id_bus || "").toString().toLowerCase();
    const tripId = (busTrip.id_trip || "").toString().toLowerCase();
    const serviceDate = formatDate(busTrip.service_date).toLowerCase();
    const status =
      (STATUS_DISPLAY[busTrip.status]?.label || "").toLowerCase();
    const departure = formatTime(
      busTrip.actual_departure
    ).toLowerCase();

    return (
      busId.includes(searchLower) ||
      tripId.includes(searchLower) ||
      serviceDate.includes(searchLower) ||
      status.includes(searchLower) ||
      departure.includes(searchLower)
    );
  });

  const currentBusTrips = filteredBusTrips.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const pageCount = Math.ceil(filteredBusTrips.length / PAGE_SIZE);

  return (
    <Box sx={{ width: "100%" }}>

      {/* Welcome + Search */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mt: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h5" fontWeight="600">
            Welcome Back
          </Typography>
          <Box
            component="img"
            src="/assets/country/hand.png"
            alt="welcome icon"
            sx={{ width: 37, height: 37, objectFit: "contain" }}
          />
        </Box>

        <TextField
          placeholder="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#9e9e9e" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            minWidth: { sm: 500, md: 727 },
            backgroundColor:
              theme.palette.mode === "light" ? "#F5F7FB" : "#1e1e2f",
            border: "1px solid #F5F7FB",
            borderRadius: 48,
            "& .MuiOutlinedInput-root": {
              borderRadius: 48,
            },
          }}
        />
      </Box>

      {/* Title + Add Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          mt: 2,
        }}
      >
        <Typography variant="h6" fontWeight="600">
          Bus Trips
        </Typography>

        <Button
          component={Link}
          to="/BusTrip/add"
          variant="contained"
          sx={{
            height: 40,
            borderRadius: 3,
            backgroundColor: "#1467D9",
            color: "#ffffff",
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            boxShadow: "0px 4px 10px rgba(20, 103, 217, 0.25)",
            "&:hover": {
              backgroundColor: "#0f57b8",
              boxShadow: "0px 6px 14px rgba(20, 103, 217, 0.35)",
            },
          }}
        >
          Add Bus Trip
        </Button>
      </Box>

      {/* Main Table */}
      <TableContainer
        component={Paper}
        sx={{
          mb: 2,
          borderRadius: 2,
          overflowX: "auto",
          backgroundColor:
            theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {[
                "#",
                "Bus ID",
                "Trip ID",
                "Service Date",
                "Actual Departure",
                "Status",
                "Action",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {currentBusTrips.map((busTrip) => (
              <TableRow
                key={busTrip.id_bus_trip}
                sx={{
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "light"
                        ? "#f5f5f5"
                        : "#2c2c3e",
                  },
                }}
              >
                <TableCell>{busTrip.id_bus_trip}</TableCell>
                <TableCell>{busTrip.id_bus}</TableCell>
                <TableCell>{busTrip.id_trip}</TableCell>
                <TableCell>
                  {formatDate(busTrip.service_date)}
                </TableCell>
                <TableCell>
                  {formatTime(busTrip.actual_departure)}
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "inline-block",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      backgroundColor:
                        busTrip.status === "in_service"
                          ? "#e8f5e9"
                          : busTrip.status === "paused"
                          ? "#fff3e0"
                          : "#e3f2fd",
                      color:
                        busTrip.status === "in_service"
                          ? "#2e7d32"
                          : busTrip.status === "paused"
                          ? "#f57c00"
                          : "#1565c0",
                      fontWeight: 500,
                      fontSize: "0.75rem",
                    }}
                  >
                    {STATUS_DISPLAY[busTrip.status]?.label ||
                      busTrip.status}
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
                    onClick={() =>
                      handleDelete(busTrip.id_bus_trip)
                    }
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
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

      {/* Display Table */}
      <Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          Bus Trip Display
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            overflowX: "auto",
            backgroundColor:
              theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 50 }}>#</TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                  }}
                >
                  List
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {currentBusTrips.map((busTrip) => (
                <TableRow key={busTrip.id_bus_trip}>
                  <TableCell>
                    {busTrip.id_bus_trip}
                  </TableCell>
                  <TableCell>
                    Bus {busTrip.id_bus} - Trip{" "}
                    {busTrip.id_trip} (
                    {formatDate(busTrip.service_date)})
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
