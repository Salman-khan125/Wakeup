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
import { useUsers } from "../context/UsersContext";

const STATUS_IMAGE_MAP = {
  active: "/assets/driver/online.png",
  inactive: "/assets/driver/offline.png",
  suspended: "/assets/driver/offline.png",
};

const GENDER_DISPLAY = {
  male: "Male",
  female: "Female",
  other: "Other",
};

const PAGE_SIZE = 4;

const User = () => {
  const theme = useTheme();
  const { users, deleteUser } = useUsers();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    deleteUser(id);

    if ((page - 1) * PAGE_SIZE >= users.length - 1) {
      setPage((p) => Math.max(p - 1, 1));
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  // SEARCH LOGIC (UNCHANGED)
  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    const fullName = user?.full_name?.toLowerCase() || "";
    const phone = user?.phone?.toLowerCase() || "";
    const gender = GENDER_DISPLAY[user?.gender]?.toLowerCase() || "";
    const countryId = user?.id_country?.toString() || "";
    const preferredLineId = user?.preferred_line_id?.toString() || "";
    const status = user?.status?.toLowerCase() || "";
    const latitude = user?.current_latitude?.toString() || "";
    const longitude = user?.current_longitude?.toString() || "";

    return (
      fullName.includes(searchLower) ||
      phone.includes(searchLower) ||
      gender.includes(searchLower) ||
      countryId.includes(searchLower) ||
      preferredLineId.includes(searchLower) ||
      status.includes(searchLower) ||
      latitude.includes(searchLower) ||
      longitude.includes(searchLower)
    );
  });

  const currentUsers = filteredUsers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const pageCount = Math.ceil(filteredUsers.length / PAGE_SIZE);

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
          Users
        </Typography>

        <Button
          component={Link}
          to="/Users/add"
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
          Add User
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
                "Full Name",
                "Phone",
                "Gender",
                "Country ID",
                "Preferred Line ID",
                "Latitude",
                "Longitude",
                "Status",
                "Created At",
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
            {currentUsers.map((user) => {
              const userId = user.id_user || user.id;

              return (
                <TableRow
                  key={userId}
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "light"
                          ? "#f5f5f5"
                          : "#2c2c3e",
                    },
                  }}
                >
                  <TableCell>{userId || "N/A"}</TableCell>
                  <TableCell>{user.full_name || "N/A"}</TableCell>
                  <TableCell>{user.phone || "N/A"}</TableCell>
                  <TableCell>
                    {GENDER_DISPLAY[user.gender] || "N/A"}
                  </TableCell>
                  <TableCell>{user.id_country || "N/A"}</TableCell>
                  <TableCell>
                    {user.preferred_line_id || "N/A"}
                  </TableCell>
                  <TableCell>
                    {user.current_latitude
                      ? parseFloat(user.current_latitude).toFixed(6)
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {user.current_longitude
                      ? parseFloat(user.current_longitude).toFixed(6)
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Box
                      component="img"
                      src={
                        STATUS_IMAGE_MAP[user.status] ||
                        "/assets/driver/offline.png"
                      }
                      alt={user.status || "Status"}
                      sx={{
                        width: 48,
                        height: 48,
                        objectFit: "contain",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {user.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      component={Link}
                      to={`/Users/edit/${userId}`}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(userId)}
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

      {/* Users Display */}
      <Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          Users Display
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
                  Name
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {currentUsers.map((user) => {
                const userId = user.id_user || user.id;
                return (
                  <TableRow key={userId}>
                    <TableCell>{userId || "N/A"}</TableCell>
                    <TableCell>{user.full_name || "N/A"}</TableCell>
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

export default User;
