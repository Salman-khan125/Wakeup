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

const STATUS_IMAGE_MAP = {
  Frame1: "/assets/stop/Frame1.png",
  Frame2: "/assets/stop/Frame2.png",
};

// Fixed: Changed to camelCase for consistency
const allStops = [
  { id: 1, name: "Daroukhane", Latitude: "14.749862", longitude: "14.7498674", city: "New York", qr: "Frame1" },
  { id: 2, name: "Daroukhane", Latitude: "14.749862", longitude: "14.7498674", city: "New York", qr: "Frame2" },
  { id: 3, name: "Daroukhane", Latitude: "14.749862", longitude: "14.7498674", city: "New York", qr: "Frame1" },
  { id: 4, name: "Daroukhane", Latitude: "14.749862", longitude: "14.7498674", city: "New York", qr: "Frame1" },
  { id: 5, name: "Daroukhane", Latitude: "14.749862", longitude: "14.7498674", city: "New York", qr: "Frame2" },
  { id: 6, name: "Daroukhane", Latitude: "14.749862", longitude: "14.7498674", city: "New York", qr: "Frame1" },
];

const PAGE_SIZE = 4;

const Stop = () => {
  const theme = useTheme();
  
  // Fixed: Use camelCase for state variable
  const [stops, setStops] = useState(allStops);
  const [page, setPage] = useState(1);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this stop?"
    );
    if (!confirmed) return;

    // Fixed: Changed setLines to setStops
    setStops((prev) => prev.filter((s) => s.id !== id));

    if ((page - 1) * PAGE_SIZE >= stops.length - 1) {
      setPage((p) => Math.max(p - 1, 1));
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Fixed: Use state variable 'stops' instead of 'allstop'
  const currentStops = stops.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageCount = Math.ceil(stops.length / PAGE_SIZE);

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

      {/* Main Table */}
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
                Latitude No
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Longitude No
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                City
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
            {/* Fixed: Changed variable name from 'Stop' to 'stop' (lowercase) */}
            {currentStops.map((stop) => (
              <TableRow
                key={stop.id}
                sx={{
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "light" ? "#f5f5f5" : "#2c2c3e",
                  },
                }}
              >
                <TableCell>{stop.id}</TableCell>
                <TableCell>{stop.name}</TableCell>
                <TableCell>{stop.Latitude}</TableCell>
                <TableCell>{stop.longitude}</TableCell>
                <TableCell>{stop.city}</TableCell>
                <TableCell>
                  {/* Fixed: Changed from STATUS_IMAGE_MAP[Stop.status] to STATUS_IMAGE_MAP[stop.qr] */}
                  <Box
                    component="img"
                    src={STATUS_IMAGE_MAP[stop.qr]}
                    alt={stop.qr}
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
                    to={`/Stop/edit/${stop.id}`} // Fixed: Changed from 'stop.id' to 'stop.id'
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(stop.id)} // Fixed: Changed from 'stop.id' to 'stop.id'
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
              {/* Fixed: Changed variable name from 'Stop' to 'stop' (lowercase) */}
              {currentStops.map((stop) => (
                <TableRow key={stop.id}>
                  <TableCell>{stop.id}</TableCell>
                  <TableCell>{stop.name}</TableCell>
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