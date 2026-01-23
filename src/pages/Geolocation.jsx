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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import { useGeolocations } from "../context/GeolocationContext";

const PAGE_SIZE = 4;

const Geolocation = () => {
  const theme = useTheme();
  
  // GET DATA FROM CONTEXT
  const { geolocations, deleteGeolocation } = useGeolocations();
  
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id_geo) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this geolocation?"
    );
    if (!confirmed) return;

    // USE CONTEXT FUNCTION
    deleteGeolocation(id_geo);

    if ((page - 1) * PAGE_SIZE >= geolocations.length - 1) {
      setPage((p) => Math.max(p - 1, 1));
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Helper function to format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    try {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } catch (error) {
      return timestamp;
    }
  };

  // SEARCH FUNCTIONALITY
  const filteredGeolocations = geolocations.filter(geo => {
    const searchLower = searchTerm.toLowerCase();
    const busTripId = (geo.id_bus_trip || "").toString().toLowerCase();
    const latitude = (geo.latitude || "").toString().toLowerCase();
    const longitude = (geo.longitude || "").toString().toLowerCase();
    const timestamp = formatTimestamp(geo.timestamp).toLowerCase();
    
    return busTripId.includes(searchLower) ||
           latitude.includes(searchLower) ||
           longitude.includes(searchLower) ||
           timestamp.includes(searchLower);
  });

  const currentGeolocations = filteredGeolocations.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageCount = Math.ceil(filteredGeolocations.length / PAGE_SIZE);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header - Same structure as Trip */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Geolocation
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
          to="/Geolocation/add"
          variant="contained"
          sx={{ height: 40, borderRadius: 3 }}
        >
          + Add
        </Button>
      </Box>

      {/* Main Table - Using Geolocation data */}
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
                Bus Trip ID
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Latitude
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Longitude
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Timestamp
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Action
              </TableCell>
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

      {/* Geolocation Display List - Same structure as Trip */}
      <Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          Geolocation Display
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