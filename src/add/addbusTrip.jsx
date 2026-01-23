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
import { useBusTrips } from "../context/BusTripContext";

const AddBusTrip = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  // GET CONTEXT FUNCTION
  const { addBusTrip } = useBusTrips();
  
  // Form state for BusTrip fields
  const [form, setForm] = useState({
    id_bus: "",
    id_trip: "",
    service_date: "",
    actual_departure: "",
    status: "in_service",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitting bus trip form:", form);
    
    // Validate required fields
    if (!form.id_bus || !form.id_trip || !form.service_date || !form.actual_departure || !form.status) {
      alert("All fields are required!");
      return;
    }
    
    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(form.service_date)) {
      alert("Service date must be in YYYY-MM-DD format");
      return;
    }
    
    // Validate time format (HH:MM)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(form.actual_departure)) {
      alert("Departure time must be in HH:MM format (24-hour)");
      return;
    }
    
    // ADD BUS TRIP USING CONTEXT FUNCTION
    addBusTrip(form);
    
    alert("Bus trip added successfully!");
    
    // Navigate back to bus trips list
    navigate("/BusTrip");
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header - Same structure */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Add New Bus Trip
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Add new bus trip information
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
            {/* Bus ID */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Bus ID *
              </Typography>
              <TextField 
                fullWidth 
                name="id_bus"
                type="number"
                value={form.id_bus}
                onChange={handleChange}
                placeholder="Enter bus ID"
                required 
                sx={{ 
                  "& .MuiOutlinedInput-root": { 
                    borderRadius: 3,
                  } 
                }} 
              />
            </Grid>

            {/* Trip ID */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Trip ID *
              </Typography>
              <TextField 
                fullWidth 
                name="id_trip"
                type="number"
                value={form.id_trip}
                onChange={handleChange}
                placeholder="Enter trip ID"
                required 
                sx={{ 
                  "& .MuiOutlinedInput-root": { 
                    borderRadius: 3,
                  } 
                }} 
              />
            </Grid>

            {/* Service Date */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Service Date *
              </Typography>
              <TextField 
                fullWidth 
                name="service_date"
                type="date"
                value={form.service_date}
                onChange={handleChange}
                required
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

            {/* Actual Departure */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Actual Departure *
              </Typography>
              <TextField 
                fullWidth 
                name="actual_departure"
                value={form.actual_departure}
                onChange={handleChange}
                placeholder="HH:MM (24-hour format)"
                required 
                sx={{ 
                  "& .MuiOutlinedInput-root": { 
                    borderRadius: 3,
                  } 
                }} 
              />
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
                  <MenuItem value="in_service">In Service</MenuItem>
                  <MenuItem value="paused">Paused</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
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
              Add Bus Trip
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate("/BusTrip")}
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

export default AddBusTrip;