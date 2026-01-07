import React, { useState, useEffect } from "react";
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
import { useBuses } from "../context/BusContext";

const STATUS_IMAGE_MAP = {
  Active: "/assets/bus/Active.png",
  maintenance: "/assets/bus/maintenance.png",
  OutofService: "/assets/bus/OutofService.png",
};

const STATUS_DIMENSIONS = {
  Active: { width: "auto", height: 40 },
  maintenance: { width: "auto", height: 40 },
  OutofService: { width: "auto", height: 40 },
};

const PAGE_SIZE = 4;

const Bus = () => {
  const theme = useTheme();
  const { buses, deleteBus } = useBuses();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Define filteredBuses FIRST
  const filteredBuses = buses.filter(
    (bus) =>
      bus.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.seat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. THEN use filteredBuses in useEffect
  useEffect(() => {
    const currentPageCount = Math.ceil(filteredBuses.length / PAGE_SIZE);

    if (page > currentPageCount && currentPageCount > 0) {
      setPage(currentPageCount);
    }

    if (page === 0 && filteredBuses.length > 0) {
      setPage(1);
    }
  }, [filteredBuses, page]);

  // 3. Define currentBuses and pageCount
  const currentBuses = filteredBuses.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );
  const pageCount = Math.ceil(filteredBuses.length / PAGE_SIZE);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this bus?"
    );
    if (!confirmed) return;

    deleteBus(id);
  };

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
              <TableCell
                sx={{ fontWeight: 600, color: theme.palette.text.primary }}
              >
                #
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, color: theme.palette.text.primary }}
              >
                Vehicle Number
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, color: theme.palette.text.primary }}
              >
                No of Seat
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, color: theme.palette.text.primary }}
              >
                Bus Model
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, color: theme.palette.text.primary }}
              >
                Bus Status
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, color: theme.palette.text.primary }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentBuses.length > 0 ? (
              currentBuses.map((bus) => (
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
                      {bus.status && STATUS_IMAGE_MAP[bus.status] ? (
                        <Box
                          component="img"
                          src={STATUS_IMAGE_MAP[bus.status]}
                          alt={bus.status}
                          sx={{
                            width:
                              STATUS_DIMENSIONS[bus.status]?.width || "auto",
                            height: STATUS_DIMENSIONS[bus.status]?.height || 40,
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          No status
                        </Typography>
                      )}
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography color="textSecondary">No buses found</Typography>
                </TableCell>
              </TableRow>
            )}
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
            backgroundColor:
              theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
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
              {currentBuses.length > 0 ? (
                currentBuses.map((bus) => (
                  <TableRow key={bus.id}>
                    <TableCell>{bus.id}</TableCell>
                    <TableCell>{bus.number}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No buses to display
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Bus;
