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
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";
import { Link } from "react-router-dom";
import { useAlerts } from "../context/AlertContext";

const PAGE_SIZE = 4;

const Alert = () => {
  const theme = useTheme();
  
  // GET DATA FROM CONTEXT
  const { alerts, deleteAlert } = useAlerts();
  
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id_alert) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this alert?"
    );
    if (!confirmed) return;

    // USE CONTEXT FUNCTION
    deleteAlert(id_alert);

    if ((page - 1) * PAGE_SIZE >= alerts.length - 1) {
      setPage((p) => Math.max(p - 1, 1));
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Helper function to format timestamp
  const formatDateTime = (dateTime) => {
    if (!dateTime) return "N/A";
    try {
      const date = new Date(dateTime);
      return date.toLocaleString();
    } catch (error) {
      return dateTime;
    }
  };

  // Alert type display mapping
  const ALERT_TYPE_DISPLAY = {
    incident: { label: "Incident", color: "error" },
    delay: { label: "Delay", color: "warning" },
    breakdown: { label: "Breakdown", color: "error" },
    other: { label: "Other", color: "info" },
  };

  // Status display mapping
  const STATUS_DISPLAY = {
    new: { label: "New", color: "warning" },
    in_progress: { label: "In Progress", color: "info" },
    resolved: { label: "Resolved", color: "success" },
  };

  // SEARCH FUNCTIONALITY
  const filteredAlerts = alerts.filter(alert => {
    const searchLower = searchTerm.toLowerCase();
    const busTripId = (alert.id_bus_trip || "").toString().toLowerCase();
    const driverId = (alert.id_driver || "").toString().toLowerCase();
    const alertType = (ALERT_TYPE_DISPLAY[alert.alert_type]?.label || "").toLowerCase();
    const status = (STATUS_DISPLAY[alert.status]?.label || "").toLowerCase();
    const message = (alert.message || "").toLowerCase();
    const createdAt = formatDateTime(alert.created_at).toLowerCase();
    
    return busTripId.includes(searchLower) ||
           driverId.includes(searchLower) ||
           alertType.includes(searchLower) ||
           status.includes(searchLower) ||
           message.includes(searchLower) ||
           createdAt.includes(searchLower);
  });

  const currentAlerts = filteredAlerts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageCount = Math.ceil(filteredAlerts.length / PAGE_SIZE);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header - Same structure as Trip */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Alert
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
          to="/Alert/add"
          variant="contained"
          sx={{ height: 40, borderRadius: 3 }}
        >
          + Add
        </Button>
      </Box>

      {/* Main Table - Using Alert data */}
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
                Driver ID
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Alert Type
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Message
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Registration
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentAlerts.map((alert) => (
              <TableRow
                key={alert.id_alert}
                sx={{
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "light" ? "#f5f5f5" : "#2c2c3e",
                  },
                }}
              >
                <TableCell>{alert.id_alert}</TableCell>
                <TableCell>{alert.id_bus_trip}</TableCell>
                <TableCell>{alert.id_driver}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <WarningIcon 
                      sx={{ 
                        fontSize: 16, 
                        color: 
                          alert.alert_type === "incident" || alert.alert_type === "breakdown" 
                            ? "error.main" 
                            : alert.alert_type === "delay" 
                              ? "warning.main" 
                              : "info.main" 
                      }} 
                    />
                    <Chip
                      label={ALERT_TYPE_DISPLAY[alert.alert_type]?.label || alert.alert_type}
                      size="small"
                      color={ALERT_TYPE_DISPLAY[alert.alert_type]?.color || "default"}
                      variant="outlined"
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      maxWidth: 200,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {alert.message}
                  </Typography>
                </TableCell>
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

      {/* Alert Display List - Same structure as Trip */}
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
                <TableCell
                  sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                >
                  List
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentAlerts.map((alert) => (
                <TableRow key={alert.id_alert}>
                  <TableCell>{alert.id_alert}</TableCell>
                  <TableCell>
                    [{ALERT_TYPE_DISPLAY[alert.alert_type]?.label || alert.alert_type}] Bus Trip {alert.id_bus_trip} - {STATUS_DISPLAY[alert.status]?.label || alert.status}
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