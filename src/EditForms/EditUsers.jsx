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
import { useUsers } from "../context/UsersContext";

// Status options
const STATUS_OPTIONS = [
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
];

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  
  const { users, updateUser } = useUsers();
  
  const user = users.find((u) => u.id === Number(id));

  const [form, setForm] = useState({
    name: "",
    lastname: "",
    contact: "",
    Email: "",
    license: "",
    status: "online",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        lastname: user.lastname || "",
        contact: user.contact || "",
        Email: user.Email || "",
        license: user.license || "",
        status: user.status || "online",
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(user.id, form);
    navigate("/Users");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Edit User
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Edit user information
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
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                First Name *
              </Typography>
              <TextField 
                fullWidth 
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter first name"
                required 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Last Name *
              </Typography>
              <TextField 
                fullWidth 
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                placeholder="Enter last name"
                required 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Contact No *
              </Typography>
              <TextField 
                fullWidth 
                name="contact"
                value={form.contact}
                onChange={handleChange}
                placeholder="Enter contact number"
                required 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

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
                placeholder="Enter email address"
                required 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                License No *
              </Typography>
              <TextField 
                fullWidth 
                name="license"
                value={form.license}
                onChange={handleChange}
                placeholder="Enter license number"
                required 
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
              Update User
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

export default EditUser;