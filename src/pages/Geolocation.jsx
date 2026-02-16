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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import { useGeolocations } from "../context/GeolocationContext";

const PAGE_SIZE = 4;

const Geolocation = () => {
  const theme = useTheme();
  const { geolocations, deleteGeolocation } = useGeolocations();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id_geo) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this geolocation?"
    );
    if (!confirmed) return;

    deleteGeolocation(id_geo);

    if ((page - 1) * PAGE_SIZE >= geolocations.length - 1) {
      setPage((p) => Math.max(p - 1, 1));
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    try {
      return new Date(timestamp).toLocaleString();
    } catch {
      return timestamp;
    }
  };

  // SEARCH
  const filteredGeolocations = geolocations.filter((geo) => {
    const searchLower = searchTerm.toLowerCase();
    const busTripId = (geo.id_bus_trip || "").toString().toLowerCase();
    const latitude = (geo.latitude || "").toString().toLowerCase();
    const longitude = (geo.longitude || "").toString().toLowerCase();
    const timestamp = formatTimestamp(geo.timestamp).toLowerCase();

    return (
      busTripId.includes(searchLower) ||
      latitude.includes(searchLower) ||
      longitude.includes(searchLower) ||
      timestamp.includes(searchLower)
    );
  });

  const currentGeolocations = filteredGeolocations.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const pageCount = Math.ceil(filteredGeolocations.length / PAGE_SIZE);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header + Search */}
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
            "& .MuiOutlinedInput-root": { borderRadius: 48 },
          }}
        />
      </Box>

      {/* Title + Add */}
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
          Geolocations
        </Typography>

        <Button
          component={Link}
          to="/Geolocation/add"
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
          Add Geolocation
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
              {["#", "Bus Trip ID", "Latitude", "Longitude", "Timestamp", "Action"].map(
                (header) => (
                  <TableCell
                    key={header}
                    sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                  >
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {currentGeolocations.map((geo) => (
              <TableRow
                key={geo.id_geo}
                sx={{
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "light" ? "#f5f5f5" : "#2c2c3e",
                  },
                }}
              >
                <TableCell>{geo.id_geo}</TableCell>
                <TableCell>{geo.id_bus_trip}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocationOnIcon sx={{ fontSize: 16, color: "error.main" }} />
                    {parseFloat(geo.latitude).toFixed(6)}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocationOnIcon sx={{ fontSize: 16, color: "primary.main" }} />
                    {parseFloat(geo.longitude).toFixed(6)}
                  </Box>
                </TableCell>
                <TableCell>{formatTimestamp(geo.timestamp)}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/Geolocation/edit/${geo.id_geo}`}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(geo.id_geo)}
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
          Geolocation Display
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
                <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                  List
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {currentGeolocations.map((geo) => (
                <TableRow key={geo.id_geo}>
                  <TableCell>{geo.id_geo}</TableCell>
                  <TableCell>
                    Bus Trip {geo.id_bus_trip}: {parseFloat(geo.latitude).toFixed(4)}, {parseFloat(geo.longitude).toFixed(4)}
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

export default Geolocation;
