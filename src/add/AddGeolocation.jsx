import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGeolocations } from "../context/GeolocationContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const AddGeolocation = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  // GET CONTEXT FUNCTION
  const { addGeolocation } = useGeolocations();
  
  // Form state for Geolocation fields
  const [form, setForm] = useState({
    id_bus_trip: "",
    latitude: "",
    longitude: "",
    timestamp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitting geolocation form:", form);
    
    // Validate required fields
    if (!form.id_bus_trip || !form.latitude || !form.longitude) {
      alert("Bus Trip ID, Latitude, and Longitude are required!");
      return;
    }
    
    // Validate latitude (-90 to 90)
    const lat = parseFloat(form.latitude);
    if (isNaN(lat) || lat < -90 || lat > 90) {
      alert("Latitude must be a number between -90 and 90");
      return;
    }
    
    // Validate longitude (-180 to 180)
    const lng = parseFloat(form.longitude);
    if (isNaN(lng) || lng < -180 || lng > 180) {
      alert("Longitude must be a number between -180 and 180");
      return;
    }
    
    // If timestamp is not provided, use current time
    const timestamp = form.timestamp || new Date().toISOString();
    
    // ADD GEOLOCATION USING CONTEXT FUNCTION
    addGeolocation({
      id_bus_trip: parseInt(form.id_bus_trip, 10),
      latitude: form.latitude,
      longitude: form.longitude,
      timestamp: timestamp,
    });
    
    alert("Geolocation added successfully!");
    
    // Navigate back to geolocations list
    navigate("/Geolocation");
  };

  // Handle getting current location
  const handleGetCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setForm({
            ...form,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
            timestamp: new Date().toISOString(),
          });
        },
        (error) => {
          alert("Unable to get location: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header - Same structure */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Add New Geolocation
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Add new geolocation information
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

            {/* Latitude */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Latitude *
              </Typography>
              <TextField 
                fullWidth 
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
                placeholder="e.g., 40.712776"
                required 
                sx={{ 
                  "& .MuiOutlinedInput-root": { 
                    borderRadius: 3,
                  } 
                }} 
              />
            </Grid>

            {/* Longitude */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Longitude *
              </Typography>
              <TextField 
                fullWidth 
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
                placeholder="e.g., -74.005974"
                required 
                sx={{ 
                  "& .MuiOutlinedInput-root": { 
                    borderRadius: 3,
                  } 
                }} 
              />
            </Grid>

            {/* Timestamp */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Timestamp
              </Typography>
              <TextField 
                fullWidth 
                name="timestamp"
                type="datetime-local"
                value={form.timestamp}
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

          {/* Location Helper */}
          <Box sx={{ mt: 3, mb: 2 }}>
            <Button
              variant="outlined"
              startIcon={<LocationOnIcon />}
              onClick={handleGetCurrentLocation}
              sx={{ borderRadius: 2 }}
            >
              Get Current Location
            </Button>
            <Typography variant="caption" color="textSecondary" sx={{ ml: 2 }}>
              Fill latitude, longitude, and timestamp with current location
            </Typography>
          </Box>

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
              Add Geolocation
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate("/Geolocation")}
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

export default AddGeolocation;