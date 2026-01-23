import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  useTheme,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAlerts } from "../context/AlertContext";
import WarningIcon from "@mui/icons-material/Warning";

const AddAlert = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  // GET CONTEXT FUNCTION
  const { addAlert } = useAlerts();
  
  // Form state for Alert fields
  const [form, setForm] = useState({
    id_bus_trip: "",
    id_driver: "",
    alert_type: "delay",
    message: "",
    status: "new",
    created_at: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitting alert form:", form);
    
    // Validate required fields
    if (!form.id_bus_trip || !form.id_driver || !form.alert_type || !form.message || !form.status) {
      alert("All fields except Created At are required!");
      return;
    }
    
    // Prepare alert data
    const alertData = {
      id_bus_trip: parseInt(form.id_bus_trip, 10),
      id_driver: parseInt(form.id_driver, 10),
      alert_type: form.alert_type,
      message: form.message,
      status: form.status,
      created_at: form.created_at || new Date().toISOString(),
    };
    
    addAlert(alertData);
    
    alert("Alert added successfully!");
    
    // Navigate back to alerts list
    navigate("/Alert");
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header - Same structure */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Add New Alert
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Add new alert information
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Bus Trip ID */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Bus Trip ID *
              </Typography>
              <TextField 
                fullWidth 
                name="id_bus_trip"
                type="number"
                value={form.id_bus_trip}
                onChange={handleChange}
                placeholder="Enter bus trip ID"
                required 
                sx={{ 
                  "& .MuiOutlinedInput-root": { 
                    borderRadius: 3,
                  } 
                }} 
              />
            </Grid>

            {/* Driver ID */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Driver ID *
              </Typography>
              <TextField 
                fullWidth 
                name="id_driver"
                type="number"
                value={form.id_driver}
                onChange={handleChange}
                placeholder="Enter driver ID"
                required 
                sx={{ 
                  "& .MuiOutlinedInput-root": { 
                    borderRadius: 3,
                  } 
                }} 
              />
            </Grid>

            {/* Alert Type */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Alert Type *
              </Typography>
              <FormControl fullWidth sx={{ 
                "& .MuiOutlinedInput-root": { 
                  borderRadius: 3,
                } 
              }}>
                <Select
                  name="alert_type"
                  value={form.alert_type}
                  onChange={handleChange}
                  sx={{ borderRadius: 3 }}
                  required
                >
                  <MenuItem value="incident">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <WarningIcon sx={{ color: "error.main" }} />
                      Incident
                    </Box>
                  </MenuItem>
                  <MenuItem value="delay">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <WarningIcon sx={{ color: "warning.main" }} />
                      Delay
                    </Box>
                  </MenuItem>
                  <MenuItem value="breakdown">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <WarningIcon sx={{ color: "error.main" }} />
                      Breakdown
                    </Box>
                  </MenuItem>
                  <MenuItem value="other">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <WarningIcon sx={{ color: "info.main" }} />
                      Other
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Status */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Status *
              </Typography>
              <FormControl fullWidth sx={{ 
                "& .MuiOutlinedInput-root": { 
                  borderRadius: 3,
                } 
              }}>
                <Select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  sx={{ borderRadius: 3 }}
                  required
                >
                  <MenuItem value="new">New</MenuItem>
                  <MenuItem value="in_progress">In Progress</MenuItem>
                  <MenuItem value="resolved">Resolved</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Message */}
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Message *
              </Typography>
              <TextField 
                fullWidth 
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Enter alert message"
                multiline
                rows={3}
                required 
                sx={{ 
                  "& .MuiOutlinedInput-root": { 
                    borderRadius: 3,
                  } 
                }} 
              />
            </Grid>

            {/* Created At */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Created At
              </Typography>
              <TextField 
                fullWidth 
                name="created_at"
                type="datetime-local"
                value={form.created_at}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ 
                  "& .MuiOutlinedInput-root": { 
                    borderRadius: 3,
                  } 
                }} 
              />
            </Grid>
          </Grid>

          {/* Action Buttons - Same structure */}
          <Box sx={{ 
            mt: 4, 
            display: "flex", 
            gap: 2,
            pt: 2,
            borderTop: `1px solid ${theme.palette.mode === 'light' ? '#e0e0e0' : '#333'}` 
          }}>
            <Button 
              type="submit" 
              variant="contained"
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1
              }}
            >
              Add Alert
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate("/Alert")}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1
              }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default AddAlert;