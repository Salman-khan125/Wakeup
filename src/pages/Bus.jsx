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
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useBuses } from "../context/BusContext";

const STATUS_IMAGE_MAP = {
  active: "/assets/bus/Active.png",
  maintenance: "/assets/bus/maintenance.png",
  outofservice: "/assets/bus/Outofservice.png",
};

const STATUS_DIMENSIONS = {
  active: { width: "auto", height: 40 },
  maintenance: { width: "auto", height: 40 },
  outofservice: { width: "auto", height: 40 },
};

const PAGE_SIZE = 4;

const Bus = () => {
  const theme = useTheme();
  const { buses, deleteBus } = useBuses();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this bus?"
    );
    if (!confirmed) return;

    deleteBus(id);

    if ((page - 1) * PAGE_SIZE >= buses.length - 1) {
      setPage((p) => Math.max(p - 1, 1));
    }
  };

  // Reset page when searching
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  // 🔎 Filtering Logic
  const filteredBuses = buses.filter((bus) =>
    bus.plate_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.capacity?.toString().includes(searchTerm)
  );

  const currentBuses = filteredBuses.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const pageCount = Math.ceil(filteredBuses.length / PAGE_SIZE);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
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
        {/* Left */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h5" fontWeight="600">
            Welcome Back
          </Typography>
          <Box
            component="img"
            src="/assets/country/hand.png"
            alt="welcome icon"
            sx={{
              width: 37,
              height: 37,
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Search */}
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
            borderRadius: 48,
            "& .MuiOutlinedInput-root": {
              borderRadius: 48,
            },
          }}
        />
      </Box>

      {/* Bus + Add Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h6" fontWeight="600">
          Bus
        </Typography>

        <Button
          component={Link}
          to="/Bus/add"
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
          Add Bus
        </Button>
      </Box>

      {/* Table */}
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
                "Vehicle Number",
                "No of Seat",
                "Bus Model",
                "Bus Status",
                
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
            {currentBuses.map((bus) => (
              <TableRow
                key={bus.id_bus}
                sx={{
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "light"
                        ? "#f5f5f5"
                        : "#2c2c3e",
                  },
                }}
              >
                <TableCell>{bus.id_bus}</TableCell>
                <TableCell>{bus.plate_number}</TableCell>
                <TableCell>{bus.capacity}</TableCell>
                <TableCell>{bus.model}</TableCell>

                <TableCell>
                  {STATUS_IMAGE_MAP[
                    bus.status?.toLowerCase().replace(/\s/g, "")
                  ] ? (
                    <Box
                      component="img"
                      src={
                        STATUS_IMAGE_MAP[
                          bus.status.toLowerCase().replace(/\s/g, "")
                        ]
                      }
                      alt={bus.status}
                      sx={{
                        width:
                          STATUS_DIMENSIONS[
                            bus.status.toLowerCase().replace(/\s/g, "")
                          ]?.width || "auto",
                        height:
                          STATUS_DIMENSIONS[
                            bus.status.toLowerCase().replace(/\s/g, "")
                          ]?.height || 40,
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No status
                    </Typography>
                  )}
                </TableCell>

               

                <TableCell>
                  <IconButton
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/Bus/edit/${bus.id_bus}`}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(bus.id_bus)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {currentBuses.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body2" color="text.secondary">
                    No buses found
                  </Typography>
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
    </Box>
  );
};

export default Bus;