import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  useTheme,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useLines } from "../context/LineContext";

const EditLine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  
  // GET CONTEXT FUNCTIONS
  const { lines, updateLine } = useLines();
  
  // Find the line to edit from context - use id_line and ==
  const line = lines.find((l) => l.id_line == id);

  console.log("EditLine - Found line:", line);
  console.log("EditLine - Looking for ID:", id);

  // Updated form state with new field names
  const [form, setForm] = useState({
    line_name: "",
    description: "",
    distance_km: "",
    id_company: "",
  });

  // Initialize form when line is found
  useEffect(() => {
    if (line) {
      console.log("Setting form with line data:", line);
      setForm({
        line_name: line.line_name || "",
        description: line.description || "",
        distance_km: line.distance_km || "",
        id_company: line.id_company || "",
      });
    }
  }, [line]);

  if (!line) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Line not found (ID: {id})
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate("/Line")}
          sx={{ mt: 2 }}
        >
          Back to Lines
        </Button>
      </Box>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Updating line with data:", form);
    
    // UPDATE LINE USING CONTEXT FUNCTION
    updateLine(line.id_line, form);
    
    alert("Line updated successfully!");
    
    // Navigate back to lines list
    navigate("/Line");
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
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
      

      <Box sx={{ mb: 3 , ml:3}}>
        <Typography variant="h5" fontWeight="600">
          Edit Line - {line.line_name}
        </Typography>
        <Typography variant="body2" color="textSecondary" >
          Edit line information
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
            {/* Line Name */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Line Name
              </Typography>
              <TextField 
                fullWidth 
                name="line_name"  // Changed from "name"
                value={form.line_name}
                onChange={handleChange}
                placeholder="Enter line name" 
                sx={{ 
                  "& .MuiOutlinedInput-root": { 
                    borderRadius: 3,
                    "&.Mui-focused": {
                      borderColor: theme.palette.primary.main,
                    }
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
                    "&.Mui-focused": {
                      borderColor: theme.palette.primary.main,
                    }
                  } 
                }} 
              />
            </Grid>

            {/* Distance (km) */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Distance (km)
              </Typography>
              <TextField 
                fullWidth 
                name="distance_km"  // Changed from "Role"
                type="number"
                value={form.distance_km}
                onChange={handleChange}
                placeholder="Enter distance in km" 
                sx={{ 
                  "& .MuiOutlinedInput-root": { 
                    borderRadius: 3,
                    "&.Mui-focused": {
                      borderColor: theme.palette.primary.main,
                    }
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
                    borderRadius: 3,
                    "&.Mui-focused": {
                      borderColor: theme.palette.primary.main,
                    }
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
              Update Line
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

export default EditLine;