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
import { useDrivers } from "../context/DriverContext";

// Status options for dropdown
const STATUS_OPTIONS = [
  { value: "Online", label: "Online" },
  { value: "Offline", label: "Offline" },
];

const EditDriver = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Get from context
  const { drivers, updateDriver } = useDrivers();
  
  // Debug: log what we're getting
  console.log("=== EDIT DRIVER DEBUG ===");
  console.log("URL ID:", id);
  console.log("All drivers:", drivers);
  
  // Find driver by id_driver
  const driver = drivers.find((d) => {
    console.log(`Checking: driver.id_driver=${d.id_driver}, URL id=${id}, match? ${d.id_driver == id}`);
    return d.id_driver == id;
  });

  console.log("Found driver:", driver);

  const [form, setForm] = useState({
    first_name: "",
    lastname: "",
    phone: "",
    Email: "",
    password: "",
    license: "",
    is_online: true,
    id_company: "",
    id_bus: "",
  });

  useEffect(() => {
    if (driver) {
      console.log("Setting form with driver data:", driver);
      setForm({
        first_name: driver.first_name || "",
        lastname: driver.lastname || "",
        phone: driver.phone || "",
        Email: driver.Email || "",
        password: "", // Don't pre-fill password for security
        license: driver.license || "",
        is_online: driver.is_online !== undefined ? driver.is_online : true,
        id_company: driver.id_company || "",
        id_bus: driver.id_bus || "",
      });
    }
  }, [driver]);

  if (!driver) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Driver not found (URL ID: {id})
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
          Available driver IDs: {drivers.map(d => d.id_driver).join(', ')}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate("/Driver")}
          sx={{ mt: 2 }}
        >
          Back to Drivers
        </Button>
      </Box>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("=== SUBMITTING FORM ===");
    console.log("Form data:", form);
    console.log("Driver ID to update:", driver.id_driver);
    
    // Prepare data for update
    const dataToUpdate = { ...form };
    
    // Don't send password if it's empty (keep current password)
    if (!dataToUpdate.password.trim()) {
      delete dataToUpdate.password;
    }
    
    console.log("Data being sent to updateDriver:", dataToUpdate);
    
    // Call updateDriver
    updateDriver(driver.id_driver, dataToUpdate);
    
    alert("Driver updated successfully!");
    navigate("/Driver");
  };

  return (
    <Box sx={{ width: "100%" }}>
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 3 }}>
          <Typography variant="h5" fontWeight="600">
            Welcome Back
          </Typography>
          <Box
            component="img"
            src="/assets/country/hand.png"
            alt="welcome icon"
            sx={{ width: 37, height: 37 }}
          />
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
        }}
      >
          <Typography variant="h6" fontWeight={700} sx={{ mb: 4 }}>
          Edit Driver
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* First Name */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                First Name *
              </Typography>
              <TextField 
                fullWidth 
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                placeholder="e.g., John" 
                required
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3,backgroundColor:
              theme.palette.mode === "light" ? "#F5F7FB" : "#1e1e2f", } }} 
              />
            </Grid>

            {/* Last Name */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Last Name *
              </Typography>
              <TextField 
                fullWidth 
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                placeholder="e.g., Doe" 
                required
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3,backgroundColor:
              theme.palette.mode === "light" ? "#F5F7FB" : "#1e1e2f", } }} 
              />
            </Grid>

            {/* Contact Number */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Contact Number *
              </Typography>
              <TextField 
                fullWidth 
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g., +1234567890" 
                required
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3, backgroundColor:
              theme.palette.mode === "light" ? "#F5F7FB" : "#1e1e2f", } }} 
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Email Address *
              </Typography>
              <TextField 
                fullWidth 
                name="Email"
                type="email"
                value={form.Email}
                onChange={handleChange}
                placeholder="e.g., john.doe@example.com" 
                required
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3,backgroundColor:
              theme.palette.mode === "light" ? "#F5F7FB" : "#1e1e2f", } }} 
              />
            </Grid>

            {/* License Number */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                License Number *
              </Typography>
              <TextField 
                fullWidth 
                name="license"
                value={form.license}
                onChange={handleChange}
                placeholder="e.g., DL-123456" 
                required
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3,backgroundColor:
              theme.palette.mode === "light" ? "#F5F7FB" : "#1e1e2f", } }} 
              />
            </Grid>

            {/* Status */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Status
              </Typography>
              <FormControl fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3,backgroundColor:
              theme.palette.mode === "light" ? "#F5F7FB" : "#1e1e2f", } }}>
                <Select
                  name="is_online"
                  value={form.is_online ? "Online" : "Offline"}
                  onChange={(e) => {
                    const isOnline = e.target.value === "Online";
                    setForm({ ...form, is_online: isOnline });
                  }}
                  sx={{ borderRadius: 3 }}
                >
                  {STATUS_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Password (Optional) */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                New Password (Optional)
              </Typography>
              <TextField 
                fullWidth 
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Leave empty to keep current"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3,backgroundColor:
              theme.palette.mode === "light" ? "#F5F7FB" : "#1e1e2f", } }} 
              />
            </Grid>

            {/* Company */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Company ID
              </Typography>
              <TextField 
                fullWidth 
                name="id_company"
                value={form.id_company}
                onChange={handleChange}
                placeholder="Company ID"
                type="number"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3,backgroundColor:
              theme.palette.mode === "light" ? "#F5F7FB" : "#1e1e2f", } }} 
              />
            </Grid>

            {/* Bus */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Bus ID
              </Typography>
              <TextField 
                fullWidth 
                name="id_bus"
                value={form.id_bus}
                onChange={handleChange}
                placeholder="Bus ID"
                type="number"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3,backgroundColor:
              theme.palette.mode === "light" ? "#F5F7FB" : "#1e1e2f", } }} 
              />
            </Grid>
          </Grid>

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
              Update Driver
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate("/Driver")}
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

export default EditDriver;