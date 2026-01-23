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
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../context/UsersContext";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Status options - updated to new values
const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];

// Gender options
const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

// Country options
const COUNTRY_OPTIONS = [
  { value: 1, label: "United States" },
  { value: 2, label: "United Kingdom" },
  { value: 3, label: "Canada" },
  { value: 4, label: "Australia" },
  { value: 5, label: "Germany" },
  { value: 6, label: "France" },
  { value: 7, label: "Japan" },
  { value: 8, label: "China" },
];

// Line options
const LINE_OPTIONS = [
  { value: "L01", label: "Line 01" },
  { value: "L02", label: "Line 02" },
  { value: "L03", label: "Line 03" },
  { value: "L04", label: "Line 04" },
  { value: "L05", label: "Line 05" },
  { value: "L06", label: "Line 06" },
  { value: "L07", label: "Line 07" },
  { value: "L08", label: "Line 08" },
  { value: "L09", label: "Line 09" },
  { value: "L10", label: "Line 10" },
];

const AddUser = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  const { addUser } = useUsers();
  
  // UPDATED FORM STATE: Using new field names
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    gender: "male",
    id_country: 1,
    preferred_line_id: "L01",
    current_latitude: "",
    current_longitude: "",
    password: "",
    status: "active",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle numeric fields
    if (name === "id_country") {
      setForm({ ...form, [name]: parseInt(value, 10) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!form.full_name.trim()) {
      alert("Full name is required");
      return;
    }
    
    if (!form.phone.trim()) {
      alert("Phone number is required");
      return;
    }
    
    if (!form.password) {
      alert("Password is required");
      return;
    }
    
    // Prepare user data with new field structure
    const userData = {
      full_name: form.full_name,
      phone: form.phone,
      gender: form.gender,
      id_country: form.id_country,
      preferred_line_id: form.preferred_line_id,
      current_latitude: form.current_latitude || null,
      current_longitude: form.current_longitude || null,
      password: form.password,
      status: form.status,
    };
    
    addUser(userData);
    navigate("/Users");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Add New User
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Add new user information
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
            {/* Full Name - Replaces First Name */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Full Name *
              </Typography>
              <TextField 
                fullWidth 
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Enter full name"
                required 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            {/* Phone - Replaces Contact No */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Phone Number *
              </Typography>
              <TextField 
                fullWidth 
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                required 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            {/* Gender - New field */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Gender *
              </Typography>
              <FormControl fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}>
                <Select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  sx={{ borderRadius: 3 }}
                >
                  {GENDER_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Country - New field */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Country *
              </Typography>
              <FormControl fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}>
                <Select
                  name="id_country"
                  value={form.id_country}
                  onChange={handleChange}
                  sx={{ borderRadius: 3 }}
                >
                  {COUNTRY_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Password - New field (replaces Email) */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Password *
              </Typography>
              <TextField 
                fullWidth 
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                required 
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            {/* Preferred Line ID - New field (replaces License No) */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Preferred Line
              </Typography>
              <FormControl fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}>
                <Select
                  name="preferred_line_id"
                  value={form.preferred_line_id}
                  onChange={handleChange}
                  sx={{ borderRadius: 3 }}
                >
                  {LINE_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Latitude - New field */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Latitude (Optional)
              </Typography>
              <TextField 
                fullWidth 
                name="current_latitude"
                value={form.current_latitude}
                onChange={handleChange}
                placeholder="e.g., 40.712776"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            {/* Longitude - New field */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Longitude (Optional)
              </Typography>
              <TextField 
                fullWidth 
                name="current_longitude"
                value={form.current_longitude}
                onChange={handleChange}
                placeholder="e.g., -74.005974"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            {/* Status - Updated values */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Status
              </Typography>
              <FormControl fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}>
                <Select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
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
              sx={{ borderRadius: 3, px: 4, py: 1 }}
            >
              Add User
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate("/Users")}
              sx={{ borderRadius: 3, px: 4, py: 1 }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default AddUser;