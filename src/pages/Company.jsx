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
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link } from "react-router-dom";
import { useDrivers } from "../context/DriverContext";

const STATUS_IMAGE_MAP = {
  online: "/assets/driver/online.png",
  offline: "/assets/driver/offline.png",
};

const PAGE_SIZE = 4;

const Driver = () => {
  const theme = useTheme();
  const { drivers, deleteDriver } = useDrivers();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this driver?"
    );
    if (!confirmed) return;

    deleteDriver(id);

    if ((page - 1) * PAGE_SIZE >= drivers.length - 1) {
      setPage((p) => Math.max(p - 1, 1));
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const filteredDrivers = drivers.filter((driver) =>
    driver.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.license?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.is_online?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.id_company?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.id_bus?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentDrivers = filteredDrivers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const pageCount = Math.ceil(filteredDrivers.length / PAGE_SIZE);

  return (
    <Box sx={{ width: "100%" }}>

      {/* Welcome + Search (EXACT SAME AS COMPANY) */}
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

      {/* Driver + Add Button (STRUCTURE SAME AS COMPANY) */}
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
          Driver
        </Typography>

        <Button
          component={Link}
          to="/Company/add"
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
          Add Company
        </Button>
      </Box>

      {/* Main Table (STYLING SAME AS COMPANY) */}
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
                "First Name",
                "Last Name",
                "Contact No",
                "Email",
                "Password",
                "License No",
                "Status",
                "Company",
                "Bus",
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
            {currentDrivers.map((driver) => (
              <TableRow
                key={driver.id_driver}
                sx={{
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "light"
                        ? "#f5f5f5"
                        : "#2c2c3e",
                  },
                }}
              >
                <TableCell>{driver.id_driver}</TableCell>
                <TableCell>{driver.first_name}</TableCell>
                <TableCell>{driver.lastname}</TableCell>
                <TableCell>{driver.phone}</TableCell>
                <TableCell>{driver.Email}</TableCell>

                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {driver.password ? (
                      <>
                        <LockIcon
                          fontSize="small"
                          sx={{ color: theme.palette.success.main }}
                        />
                        <Typography variant="caption" color="textSecondary">
                          Password set
                        </Typography>
                      </>
                    ) : (
                      <>
                        <LockOpenIcon
                          fontSize="small"
                          sx={{ color: theme.palette.error.main }}
                        />
                        <Typography variant="caption" color="textSecondary">
                          No password
                        </Typography>
                      </>
                    )}
                  </Box>
                </TableCell>

                <TableCell>{driver.license}</TableCell>

                <TableCell>
                  <Box
                    component="img"
                    src={
                      STATUS_IMAGE_MAP[
                        driver.is_online ? "online" : "offline"
                      ]
                    }
                    alt={driver.is_online ? "Online" : "Offline"}
                    sx={{
                      width: 48,
                      height: 48,
                      objectFit: "contain",
                    }}
                  />
                </TableCell>

                <TableCell>{driver.id_company}</TableCell>
                <TableCell>{driver.id_bus}</TableCell>

                <TableCell>
                  <IconButton
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/Driver/edit/${driver.id_driver}`}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(driver.id_driver)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination (SAME POSITION) */}
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

      {/* Driver Display (SAME STRUCTURE AS COMPANY DISPLAY) */}
      <Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          Driver Display
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
              {currentDrivers.map((driver) => (
                <TableRow key={driver.id_driver}>
                  <TableCell>{driver.id_driver}</TableCell>
                  <TableCell>
                    {driver.first_name} {driver.lastname}
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

export default Driver;
