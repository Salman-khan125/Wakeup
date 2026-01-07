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
import { useLines } from "../context/LineContext"; // IMPORT CONTEXT

// Role options for dropdown
const ROLE_OPTIONS = [
  { value: "Region", label: "Region" },
  { value: "District", label: "District" },
  { value: "City", label: "City" },
  { value: "Admin", label: "Admin" },
  { value: "Manager", label: "Manager" },
];

const AddLine = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  // GET CONTEXT FUNCTION
  const { addLine } = useLines();
  
  const [form, setForm] = useState({
    name: "",
    Email: "",
    Role: "Region",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ADD LINE USING CONTEXT FUNCTION
    addLine(form);

    // Navigate back to lines list
    navigate("/Line");
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header - Same structure */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Add New Line
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Add new line information
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
                Line Name *
              </Typography>
              <TextField 
                fullWidth 
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter line name"
                required 
                sx={{ 
                  "& .MuiOutlinedInput-root": { 
                    borderRadius: 3,
                  } 
                }} 
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
                sx={{ 
                  "& .MuiOutlinedInput-root": { 
                    borderRadius: 3,
                  } 
                }} 
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Role
              </Typography>
              <FormControl fullWidth sx={{ 
                "& .MuiOutlinedInput-root": { 
                  borderRadius: 3,
                } 
              }}>
                <Select
                  name="Role"
                  value={form.Role}
                  onChange={handleChange}
                  sx={{ borderRadius: 3 }}
                >
                  {ROLE_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Action Buttons */}
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
              Add Line
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate("/Line")}
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

export default AddLine;