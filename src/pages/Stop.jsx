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
import { useStops } from "../context/StopContext";

const STATUS_IMAGE_MAP = {
  Frame1: "/assets/stop/Frame1.png",
  Frame2: "/assets/stop/Frame2.png",
};

const PAGE_SIZE = 4;

const Stop = () => {
  const theme = useTheme();
  
  const { stops, deleteStop } = useStops();
  
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this stop?"
    );
    if (!confirmed) return;

    deleteStop(id);

    if ((page - 1) * PAGE_SIZE >= stops.length - 1) {
      setPage((p) => Math.max(p - 1, 1));
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  // UPDATED SEARCH: Use new field names with optional chaining
  const filteredStops = stops.filter(stop => {
    const searchLower = searchTerm.toLowerCase();
    const stopName = stop?.stop_name?.toLowerCase() || '';
    const city = stop?.city?.toLowerCase() || '';
    const latitude = stop?.Latitude?.toLowerCase() || '';
    const longitude = stop?.longitude?.toLowerCase() || '';
    const qrCode = stop?.qr_code?.toLowerCase() || '';
    const countryId = stop?.id_country?.toString() || '';
    
    return stopName.includes(searchLower) ||
           city.includes(searchLower) ||
           latitude.includes(searchLower) ||
           longitude.includes(searchLower) ||
           qrCode.includes(searchLower) ||
           countryId.includes(searchLower);
  });

  const currentStops = filteredStops.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageCount = Math.ceil(filteredStops.length / PAGE_SIZE);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Stop
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Information about your current plan and usages
        </Typography>
      </Box>

      {/* Search + Add */}
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
          to="/Stop/add"
          variant="contained"
          sx={{ height: 40, borderRadius: 3 }}
        >
          + Add
        </Button>
      </Box>

      {/* Main Table - UPDATED FIELD NAMES */}
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
                Stop Name
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Latitude
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Longitude
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                City
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Country ID
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                QR
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentStops.map((stop) => (
              <TableRow
                key={stop.id || stop.id_stop} // Use id_stop if id doesn't exist
                sx={{
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "light" ? "#f5f5f5" : "#2c2c3e",
                  },
                }}
              >
                <TableCell>{stop.id || stop.id_stop || "N/A"}</TableCell>
                <TableCell>{stop.stop_name || "N/A"}</TableCell>
                <TableCell>{stop.Latitude || "N/A"}</TableCell>
                <TableCell>{stop.longitude || "N/A"}</TableCell>
                <TableCell>{stop.city || "N/A"}</TableCell>
                <TableCell>{stop.id_country || "N/A"}</TableCell>
                <TableCell>
                  <Box
                    component="img"
                    src={STATUS_IMAGE_MAP[stop.qr_code] || "/assets/stop/default.png"}
                    alt={stop.qr_code || "QR"}
                    sx={{
                      width: 48,
                      height: 48,
                      objectFit: "contain",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/Stop/edit/${stop.id || stop.id_stop}`}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(stop.id || stop.id_stop)}
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

      {/* Stop Display List */}
      <Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          Stop Display
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
                <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                  List
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentStops.map((stop) => (
                <TableRow key={stop.id || stop.id_stop}>
                  <TableCell>{stop.id || stop.id_stop || "N/A"}</TableCell>
                  <TableCell>{stop.stop_name || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Stop;