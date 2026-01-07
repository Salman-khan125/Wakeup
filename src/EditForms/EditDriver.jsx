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
import { useDrivers } from "../context/DriverContext"; // CHANGE THIS IMPORT

// Status options for dropdown
const STATUS_OPTIONS = [
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
];

const EditDriver = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Get from context
  const { drivers, updateDriver } = useDrivers();
  
  const driver = drivers.find((d) => d.id === Number(id));

  const [form, setForm] = useState({
    name: "",
    lastname: "",
    contact: "",
    Email: "",
    license: "",
    status: "online",
  });

  useEffect(() => {
    if (driver) {
      setForm({
        name: driver.name || "",
        lastname: driver.lastname || "",
        contact: driver.contact || "",
        Email: driver.Email || "",
        license: driver.license || "",
        status: driver.status || "online",
      });
    }
  }, [driver]);

  if (!driver) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Driver not found
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
    updateDriver(driver.id, form);
    alert("Driver updated successfully!");
    navigate("/Driver");
  };

  return (
<Box sx={{ width: "100%" }}>
      <Paper
        elevation={0}
        sx={{
          mt: 4,
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
        }}
      >
        <Typography variant="h5" mb={2}>
          Edit Driver
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                First Name
              </Typography>
              <TextField 
                fullWidth 
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="First Name" 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Last Name
              </Typography>
              <TextField 
                fullWidth 
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                placeholder="Last Name" 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Contact Number
              </Typography>
              <TextField 
                fullWidth 
                name="contact"
                value={form.contact}
                onChange={handleChange}
                placeholder="+00*******" 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Email Address
              </Typography>
              <TextField 
                fullWidth 
                name="Email"
                value={form.Email}
                onChange={handleChange}
                placeholder="Email" 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                License Number
              </Typography>
              <TextField 
                fullWidth 
                name="license"
                value={form.license}
                onChange={handleChange}
                placeholder="License Number" 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Status
              </Typography>
              <FormControl fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}>
                <Select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  displayEmpty
                >
                  {STATUS_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            <Button type="submit" variant="contained">
              Update Driver
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate("/Driver")}
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