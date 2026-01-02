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
  green: "/assets/bus/green.png",
  yellow: "/assets/bus/yellow.png",
  orange: "/assets/bus/orange.png",
};

const STATUS_DIMENSIONS = {
  green: { width: "auto", height: 40 },
  yellow: { width: "auto", height: 40 },
  orange: { width: "auto", height: 40 },
};

// Fixed variable name - use camelCase consistently
const allBuses = [
  { id: 1, number: "ale848", seat: "SL", model: "Region", status: "green" },
  { id: 2, number: "ale848", seat: "SL", model: "Region", status: "yellow" },
  { id: 3, number: "ale848", seat: "SL", model: "Region", status: "orange" },
  { id: 4, number: "ale848", seat: "SL", model: "Region", status: "green" },
  { id: 5, number: "ale848", seat: "SL", model: "Region", status: "orange" },
  { id: 6, number: "ale848", seat: "SL", model: "Region", status: "yellow" },
];

const PAGE_SIZE = 4;

const Bus = () => {
  const theme = useTheme();
  
  // Corrected: using allBuses (camelCase)
  const [buses, setBuses] = useState(allBuses);
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Fixed: Changed 'companies' to 'buses'
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this bus?"
    );
    if (!confirmed) return;

    setBuses((prev) => prev.filter((b) => b.id !== id));

    // Fixed: Changed 'companies' to 'buses'
    if ((page - 1) * PAGE_SIZE >= buses.length - 1) {
      setPage((p) => Math.max(p - 1, 1));
    }
  };

  // Fixed: Use the state variable 'buses' instead of 'allbuses'
  const currentBuses = buses.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageCount = Math.ceil(buses.length / PAGE_SIZE);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Bus
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
          to="/Bus/add"
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
                Vehicle Number
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                No of Seat
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Bus Model
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Bus Status
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentBuses.map((bus) => (
              <TableRow
                key={bus.id}
                sx={{
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "light" ? "#f5f5f5" : "#2c2c3e",
                  },
                }}
              >
                <TableCell>{bus.id}</TableCell>
                <TableCell>{bus.number}</TableCell>
                <TableCell>{bus.seat}</TableCell>
                <TableCell>{bus.model}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      component="img"
                      src={STATUS_IMAGE_MAP[bus.status]}
                      alt={bus.status}
                      sx={{
                        width: STATUS_DIMENSIONS[bus.status].width,
                        height: STATUS_DIMENSIONS[bus.status].height,
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/Bus/edit/${bus.id}`}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(bus.id)}
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

      {/* Bus Display List */}
      <Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          Bus Display
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
              {currentBuses.map((bus) => (
                <TableRow key={bus.id}>
                  <TableCell>{bus.id}</TableCell>
                  <TableCell>{bus.number}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Bus;