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
import { useLines } from "../context/LineContext";

const AddLine = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  // GET CONTEXT FUNCTION
  const { addLine } = useLines();
  
  // Updated form state with new field names
  const [form, setForm] = useState({
    line_name: "",
    description: "",
    distance_km: "",
    id_company: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitting line form:", form);
    
    // Validate required fields
    if (!form.line_name || !form.distance_km) {
      alert("Line Name and Distance are required!");
      return;
    }
    
    // ADD LINE USING CONTEXT FUNCTION
    addLine(form);
    
    alert("Line added successfully!");
    
    // Navigate back to lines list
    navigate("/Line");
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header - Same structure */}
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
  {/* LEFT SIDE */}
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1,
      ml: 3,
    }}
  >
    <Typography variant="h5" fontWeight="600">
      Welcome Back
    </Typography>

    <Box
      component="img"
      src="/assets/country/hand.png"
      alt="welcome icon"
      sx={{
        width: 37,
        height: 37,
        objectFit: "contain",
      }}
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
    Add Driver
  </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Line Name */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Line Name *
              </Typography>
              <TextField 
                fullWidth 
                name="line_name"  // Changed from "name"
                value={form.line_name}
                onChange={handleChange}
                placeholder="Enter line name"
                required 
                sx={{ 
                  "& .MuiOutlinedInput-root": { 
                    borderRadius: 3,
                    backgroundColor:
              theme.palette.mode === "light" ? "#F5F7FB" : "#1e1e2f",
                  } 
                }} 
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Description
              </Typography>
              <TextField 
                fullWidth 
                name="description"  // Changed from "Email"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter line description"
                sx={{ 
                  "& .MuiOutlinedInput-root": { 
                    borderRadius: 3,
                    backgroundColor:
              theme.palette.mode === "light" ? "#F5F7FB" : "#1e1e2f",
                  } 
                }} 
              />
            </Grid>

            {/* Distance (km) */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Distance (km) *
              </Typography>
              <TextField 
                fullWidth 
                name="distance_km"  // Changed from "Role"
                type="number"
                value={form.distance_km}
                onChange={handleChange}
                placeholder="Enter distance in km"
                required 
                sx={{ 
                  "& .MuiOutlinedInput-root": { 
                    borderRadius: 3,
                    backgroundColor:
              theme.palette.mode === "light" ? "#F5F7FB" : "#1e1e2f",
                  } 
                }} 
              />
            </Grid>

            {/* Company ID */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Company ID
              </Typography>
              <TextField 
                fullWidth 
                name="id_company"  // New field
                type="number"
                value={form.id_company}
                onChange={handleChange}
                placeholder="Enter company ID"
                sx={{ 
                  "& .MuiOutlinedInput-root": { 
                    borderRadius: 3,backgroundColor:
              theme.palette.mode === "light" ? "#F5F7FB" : "#1e1e2f",
                  } 
                }} 
              />
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