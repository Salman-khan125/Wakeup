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
import { useTrips } from "../context/TripContext";

const PAGE_SIZE = 4;

const Trip = () => {
  const theme = useTheme();
  const { trips, deleteTrip } = useTrips();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id_trip) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this trip?"
    );
    if (!confirmed) return;

    deleteTrip(id_trip);

    if ((page - 1) * PAGE_SIZE >= trips.length - 1) {
      setPage((p) => Math.max(p - 1, 1));
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  // SEARCH LOGIC (UNCHANGED)
  const filteredTrips = trips.filter((trip) => {
    const searchLower = searchTerm.toLowerCase();
    const direction = (trip.direction || "").toLowerCase();
    const lineId = (trip.id_line || "").toString().toLowerCase();
    const departure = (trip.scheduled_departure || "").toLowerCase();
    const arrival = (trip.scheduled_arrival || "").toLowerCase();

    return (
      direction.includes(searchLower) ||
      lineId.includes(searchLower) ||
      departure.includes(searchLower) ||
      arrival.includes(searchLower)
    );
  });

  const currentTrips = filteredTrips.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const pageCount = Math.ceil(filteredTrips.length / PAGE_SIZE);

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
          Trips
        </Typography>

        <Button
          component={Link}
          to="/Trip/add"
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
          Add Trip
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
                "Line ID",
                "Direction",
                "Departure Time",
                "Arrival Time",
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
            {currentTrips.map((trip) => (
              <TableRow
                key={trip.id_trip}
                sx={{
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "light"
                        ? "#f5f5f5"
                        : "#2c2c3e",
                  },
                }}
              >
                <TableCell>{trip.id_trip}</TableCell>
                <TableCell>{trip.id_line}</TableCell>
                <TableCell>{trip.direction}</TableCell>
                <TableCell>{trip.scheduled_departure}</TableCell>
                <TableCell>{trip.scheduled_arrival}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/Trip/edit/${trip.id_trip}`}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(trip.id_trip)}
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

      {/* Trip Display */}
      <Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          Trip Display
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
              {currentTrips.map((trip) => (
                <TableRow key={trip.id_trip}>
                  <TableCell>{trip.id_trip}</TableCell>
                  <TableCell>
                    Line {trip.id_line} - {trip.direction} (
                    {trip.scheduled_departure})
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

export default Trip;
