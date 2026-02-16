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

  // SEARCH LOGIC (UNCHANGED)
  const filteredStops = stops.filter((stop) => {
    const searchLower = searchTerm.toLowerCase();
    const stopName = stop?.stop_name?.toLowerCase() || "";
    const city = stop?.city?.toLowerCase() || "";
    const latitude = stop?.Latitude?.toLowerCase() || "";
    const longitude = stop?.longitude?.toLowerCase() || "";
    const qrCode = stop?.qr_code?.toLowerCase() || "";
    const countryId = stop?.id_country?.toString() || "";

    return (
      stopName.includes(searchLower) ||
      city.includes(searchLower) ||
      latitude.includes(searchLower) ||
      longitude.includes(searchLower) ||
      qrCode.includes(searchLower) ||
      countryId.includes(searchLower)
    );
  });

  const currentStops = filteredStops.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const pageCount = Math.ceil(filteredStops.length / PAGE_SIZE);

  return (
    <Box sx={{ width: "100%" }}>

      {/* Welcome + Search (Unified Layout) */}
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

      {/* Stop + Add Button */}
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
          Stop
        </Typography>

        <Button
          component={Link}
          to="/Stop/add"
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
          Add Stop
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
                "Stop Name",
                "Latitude",
                "Longitude",
                "City",
                "Country ID",
                "QR",
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
            {currentStops.map((stop) => {
              const stopId = stop.id || stop.id_stop;

              return (
                <TableRow
                  key={stopId}
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "light"
                          ? "#f5f5f5"
                          : "#2c2c3e",
                    },
                  }}
                >
                  <TableCell>{stopId || "N/A"}</TableCell>
                  <TableCell>{stop.stop_name || "N/A"}</TableCell>
                  <TableCell>{stop.Latitude || "N/A"}</TableCell>
                  <TableCell>{stop.longitude || "N/A"}</TableCell>
                  <TableCell>{stop.city || "N/A"}</TableCell>
                  <TableCell>{stop.id_country || "N/A"}</TableCell>

                  <TableCell>
                    <Box
                      component="img"
                      src={
                        STATUS_IMAGE_MAP[stop.qr_code] ||
                        "/assets/stop/default.png"
                      }
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
                      to={`/Stop/edit/${stopId}`}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(stopId)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
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

      {/* Stop Display Section */}
      <Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          Stop Display
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
              {currentStops.map((stop) => {
                const stopId = stop.id || stop.id_stop;
                return (
                  <TableRow key={stopId}>
                    <TableCell>{stopId || "N/A"}</TableCell>
                    <TableCell>{stop.stop_name || "N/A"}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Stop;
