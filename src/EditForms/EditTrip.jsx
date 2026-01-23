import React, { useState, useEffect } from "react";
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
import { useParams, useNavigate } from "react-router-dom";
import { useTrips } from "../context/TripContext";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DirectionsIcon from "@mui/icons-material/Directions";

// Direction options
const DIRECTION_OPTIONS = [
  { value: "outbound", label: "Outbound" },
  { value: "return", label: "Return" },
];

// Line options
const LINE_OPTIONS = [
  { value: 1, label: "Line 1" },
  { value: 2, label: "Line 2" },
  { value: 3, label: "Line 3" },
  { value: 4, label: "Line 4" },
  { value: 5, label: "Line 5" },
  { value: 6, label: "Line 6" },
  { value: 7, label: "Line 7" },
  { value: 8, label: "Line 8" },
  { value: 9, label: "Line 9" },
  { value: 10, label: "Line 10" },
  { value: 11, label: "Line 11" },
  { value: 12, label: "Line 12" },
  { value: 13, label: "Line 13" },
  { value: 14, label: "Line 14" },
  { value: 15, label: "Line 15" },
];

const EditTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  
  const { trips, updateTrip, getTripById } = useTrips();
  
  // Find trip by id_trip
  const trip = getTripById ? getTripById(Number(id)) : trips.find((t) => t.id_trip === Number(id));

  const [form, setForm] = useState({
    id_line: 1,
    direction: "outbound",
    scheduled_departure: "08:00",
    scheduled_arrival: "08:45",
  });

  useEffect(() => {
    if (trip) {
      setForm({
        id_line: trip.id_line || 1,
        direction: trip.direction || "outbound",
        scheduled_departure: trip.scheduled_departure || "08:00",
        scheduled_arrival: trip.scheduled_arrival || "08:45",
      });
    }
  }, [trip]);

  if (!trip) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Trip not found
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate("/Trip")}
          sx={{ mt: 2 }}
        >
          Back to Trips
        </Button>
      </Box>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle numeric fields
    if (name === "id_line") {
      setForm({ ...form, [name]: parseInt(value, 10) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!form.id_line) {
      alert("Line is required");
      return;
    }
    
    if (!form.direction) {
      alert("Direction is required");
      return;
    }
    
    if (!form.scheduled_departure) {
      alert("Departure time is required");
      return;
    }
    
    if (!form.scheduled_arrival) {
      alert("Arrival time is required");
      return;
    }
    
    // Validate time format (HH:MM)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(form.scheduled_departure)) {
      alert("Departure time must be in HH:MM format (24-hour)");
      return;
    }
    
    if (!timeRegex.test(form.scheduled_arrival)) {
      alert("Arrival time must be in HH:MM format (24-hour)");
      return;
    }
    
    // Prepare update data
    const updateData = {
      id_line: form.id_line,
      direction: form.direction,
      scheduled_departure: form.scheduled_departure,
      scheduled_arrival: form.scheduled_arrival,
    };
    
    updateTrip(trip.id_trip, updateData);
    navigate("/Trip");
  };

  // Helper function to calculate duration
  const calculateDuration = (departure, arrival) => {
    if (!departure || !arrival) return "N/A";
    try {
      const [depHours, depMinutes] = departure.split(":").map(Number);
      const [arrHours, arrMinutes] = arrival.split(":").map(Number);
      
      const depTotal = depHours * 60 + depMinutes;
      const arrTotal = arrHours * 60 + arrMinutes;
      
      let duration = arrTotal - depTotal;
      if (duration < 0) duration += 24 * 60;
      
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      
      if (hours > 0) {
        return `${hours}h ${minutes}m`;
      }
      return `${minutes}m`;
    } catch (error) {
      return "N/A";
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Edit Trip
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Edit trip schedule and details
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Trip ID: {trip.id_trip}
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
            {/* Line */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Line *
              </Typography>
              <FormControl fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}>
                <Select
                  name="id_line"
                  value={form.id_line}
                  onChange={handleChange}
                  sx={{ borderRadius: 3 }}
                  required
                >
                  {LINE_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Direction */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Direction *
              </Typography>
              <FormControl fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}>
                <Select
                  name="direction"
                  value={form.direction}
                  onChange={handleChange}
                  sx={{ borderRadius: 3 }}
                  required
                >
                  {DIRECTION_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Scheduled Departure */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Scheduled Departure *
              </Typography>
              <TextField 
                fullWidth 
                name="scheduled_departure"
                type="time"
                value={form.scheduled_departure}
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min intervals
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            {/* Scheduled Arrival */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Scheduled Arrival *
              </Typography>
              <TextField 
                fullWidth 
                name="scheduled_arrival"
                type="time"
                value={form.scheduled_arrival}
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min intervals
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>
          </Grid>

          {/* Trip Information */}
          <Paper
            elevation={0}
            sx={{
              mt: 3,
              p: 2,
              borderRadius: 2,
              backgroundColor: theme.palette.mode === "light" ? "#f5f5f5" : "#2a2a3c",
            }}
          >
            <Typography variant="body2" sx={{ mb: 2, fontWeight: 700 }}>
              Trip Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="caption" color="textSecondary">Current Duration</Typography>
                <Typography variant="body1">
                  {calculateDuration(trip.scheduled_departure, trip.scheduled_arrival)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="caption" color="textSecondary">New Duration</Typography>
                <Typography variant="body1" fontWeight={600}>
                  {calculateDuration(form.scheduled_departure, form.scheduled_arrival)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="caption" color="textSecondary">Direction</Typography>
                <Typography variant="body1">
                  {DIRECTION_OPTIONS.find(d => d.value === form.direction)?.label}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

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
              sx={{ borderRadius: 3, px: 4, py: 1 }}
            >
              Update Trip
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate("/Trip")}
              sx={{ borderRadius: 3, px: 4, py: 1 }}
            >
              Cancel
            </Button>
            <Button 
              variant="text" 
              color="inherit"
              onClick={() => {
                // Reset form to original values
                if (trip) {
                  setForm({
                    id_line: trip.id_line || 1,
                    direction: trip.direction || "outbound",
                    scheduled_departure: trip.scheduled_departure || "08:00",
                    scheduled_arrival: trip.scheduled_arrival || "08:45",
                  });
                }
              }}
              sx={{ borderRadius: 3, px: 4, py: 1, ml: 'auto' }}
            >
              Reset Changes
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EditTrip;