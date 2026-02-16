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
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";
import { Link } from "react-router-dom";
import { useAlerts } from "../context/AlertContext";

const PAGE_SIZE = 4;

const Alert = () => {
  const theme = useTheme();
  const { alerts, deleteAlert } = useAlerts();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id_alert) => {
    if (!window.confirm("Are you sure you want to delete this alert?")) return;
    deleteAlert(id_alert);
    if ((page - 1) * PAGE_SIZE >= alerts.length - 1) {
      setPage((p) => Math.max(p - 1, 1));
    }
  };

  const handleChange = (event, value) => setPage(value);

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "N/A";
    try {
      return new Date(dateTime).toLocaleString();
    } catch {
      return dateTime;
    }
  };

  const ALERT_TYPE_DISPLAY = {
    incident: { label: "Incident", color: "error" },
    delay: { label: "Delay", color: "warning" },
    breakdown: { label: "Breakdown", color: "error" },
    other: { label: "Other", color: "info" },
  };

  const STATUS_DISPLAY = {
    new: { label: "New", color: "warning" },
    in_progress: { label: "In Progress", color: "info" },
    resolved: { label: "Resolved", color: "success" },
  };

  // SEARCH FILTER
  const filteredAlerts = alerts.filter((alert) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (alert.id_bus_trip || "").toString().toLowerCase().includes(searchLower) ||
      (alert.id_driver || "").toString().toLowerCase().includes(searchLower) ||
      (ALERT_TYPE_DISPLAY[alert.alert_type]?.label || "").toLowerCase().includes(searchLower) ||
      (STATUS_DISPLAY[alert.status]?.label || "").toLowerCase().includes(searchLower) ||
      (alert.message || "").toLowerCase().includes(searchLower) ||
      formatDateTime(alert.created_at).toLowerCase().includes(searchLower)
    );
  });

  const currentAlerts = filteredAlerts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageCount = Math.ceil(filteredAlerts.length / PAGE_SIZE);

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
            backgroundColor: theme.palette.mode === "light" ? "#F5F7FB" : "#1e1e2f",
            border: "1px solid #F5F7FB",
            borderRadius: 48,
            "& .MuiOutlinedInput-root": { borderRadius: 48 },
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
          Alerts
        </Typography>

        <Button
          component={Link}
          to="/Alert/add"
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
          Add Alert
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
              {[
                "#",
                "Bus Trip ID",
                "Driver ID",
                "Alert Type",
                "Message",
                "Status",
                "Registration",
                "Action",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {currentAlerts.map((alert) => (
              <TableRow
                key={alert.id_alert}
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.mode === "light" ? "#f5f5f5" : "#2c2c3e",
                  },
                }}
              >
                <TableCell>{alert.id_alert}</TableCell>
                <TableCell>{alert.id_bus_trip}</TableCell>
                <TableCell>{alert.id_driver}</TableCell>
                <TableCell>
                  <Chip
                    label={ALERT_TYPE_DISPLAY[alert.alert_type]?.label || alert.alert_type}
                    size="small"
                    color={ALERT_TYPE_DISPLAY[alert.alert_type]?.color || "default"}
                  />
                </TableCell>
                <TableCell>{alert.message}</TableCell>
                <TableCell>
                  <Chip
                    label={STATUS_DISPLAY[alert.status]?.label || alert.status}
                    size="small"
                    color={STATUS_DISPLAY[alert.status]?.color || "default"}
                  />
                </TableCell>
                <TableCell>{formatDateTime(alert.created_at)}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/Alert/edit/${alert.id_alert}`}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(alert.id_alert)}
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
          <Pagination count={pageCount} page={page} onChange={handleChange} color="primary" />
        </Box>
      )}

      {/* Alert Display */}
      <Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          Alert Display
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
                <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>List</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {currentAlerts.map((alert) => (
                <TableRow key={alert.id_alert}>
                  <TableCell>{alert.id_alert}</TableCell>
                  <TableCell>
                    [{ALERT_TYPE_DISPLAY[alert.alert_type]?.label || alert.alert_type}] Bus Trip {alert.id_bus_trip} -{" "}
                    {STATUS_DISPLAY[alert.status]?.label || alert.status}
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

export default Alert;
