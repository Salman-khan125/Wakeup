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
  InputLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useUsers } from "../context/UsersContext";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// Status options - updated to match new enum values
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

// Country options (matching the IDs from context)
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

// Sample line IDs
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

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  
  const { users, updateUser, getUserById } = useUsers();
  
  // Find user by id_user (not id)
  const user = getUserById ? getUserById(Number(id)) : users.find((u) => u.id_user === Number(id));

  // Updated form state with new fields
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    gender: "male",
    id_country: 1,
    preferred_line_id: "L01",
    current_latitude: "",
    current_longitude: "",
    password: "", // Note: In real app, you might not show current password
    status: "active",
  });

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        full_name: user.full_name || "",
        phone: user.phone || "",
        gender: user.gender || "male",
        id_country: user.id_country || 1,
        preferred_line_id: user.preferred_line_id || "L01",
        current_latitude: user.current_latitude || "",
        current_longitude: user.current_longitude || "",
        password: "", // Don't prefill password for security
        status: user.status || "active",
      });
    }
  }, [user]);

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          User not found
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate("/Users")}
          sx={{ mt: 2 }}
        >
          Back to Users
        </Button>
      </Box>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle numeric fields
    if (name === "id_country") {
      setForm({ ...form, [name]: parseInt(value, 10) });
    } else {
      setForm({ ...form, [name]: value });
    }

    // Track if password was changed
    if (name === "password") {
      setPasswordChanged(true);
    }
  };

  // Handle getting current location
  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setForm({
            ...form,
            current_latitude: position.coords.latitude.toFixed(6),
            current_longitude: position.coords.longitude.toFixed(6),
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
    
    // Prepare update data
    const updateData = {
      full_name: form.full_name,
      phone: form.phone,
      gender: form.gender,
      id_country: form.id_country,
      preferred_line_id: form.preferred_line_id,
      current_latitude: form.current_latitude || user.current_latitude || null,
      current_longitude: form.current_longitude || user.current_longitude || null,
      status: form.status,
    };
    
    // Only include password if it was changed
    if (passwordChanged && form.password) {
      updateData.password = form.password; // In real app, this should be hashed
    }
    
    updateUser(user.id_user, updateData);
    navigate("/Users");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Edit User
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Edit user information and preferences
        </Typography>
        <Typography variant="caption" color="textSecondary">
          User ID: {user.id_user}
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
            {/* Full Name */}
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

            {/* Phone */}
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

            {/* Gender */}
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

            {/* Country */}
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

            {/* Preferred Line ID */}
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

            {/* Password (Optional - only if changing) */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                New Password (Optional)
              </Typography>
              <TextField 
                fullWidth 
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current password"
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

            {/* Current Location - Latitude & Longitude */}
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Current Location (Optional)
              </Typography>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<LocationOnIcon />}
                  onClick={handleGetLocation}
                  sx={{ borderRadius: 2 }}
                >
                  Update Location
                </Button>
                <Typography variant="caption" color="textSecondary">
                  Current: {user.current_latitude || "N/A"}, {user.current_longitude || "N/A"}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                name="current_latitude"
                value={form.current_latitude}
                onChange={handleChange}
                placeholder="Latitude (e.g., 40.712776)"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth 
                name="current_longitude"
                value={form.current_longitude}
                onChange={handleChange}
                placeholder="Longitude (e.g., -74.005974)"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            {/* Status */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Status *
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

            {/* Created At (Read-only) */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Account Created
              </Typography>
              <TextField 
                fullWidth 
                value={user.created_at ? new Date(user.created_at).toLocaleString() : "Unknown"}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ 
                  "& .MuiOutlinedInput-root": { 
                    borderRadius: 3,
                    "& .MuiOutlinedInput-input": {
                      color: "text.secondary"
                    }
                  } 
                }} 
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
              sx={{ borderRadius: 3, px: 4, py: 1 }}
            >
              Update User
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate("/Users")}
              sx={{ borderRadius: 3, px: 4, py: 1 }}
            >
              Cancel
            </Button>
            <Button 
              variant="text" 
              color="inherit"
              onClick={() => {
                // Reset form to original values
                if (user) {
                  setForm({
                    full_name: user.full_name || "",
                    phone: user.phone || "",
                    gender: user.gender || "male",
                    id_country: user.id_country || 1,
                    preferred_line_id: user.preferred_line_id || "L01",
                    current_latitude: user.current_latitude || "",
                    current_longitude: user.current_longitude || "",
                    password: "",
                    status: user.status || "active",
                  });
                  setPasswordChanged(false);
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

export default EditUser;