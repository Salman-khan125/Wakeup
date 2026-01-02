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

// Same data as in Line.jsx
const allLines = [
  { id: 1, name: "Alley", Email: "Alleyjhon@gmail.com", Role: "Region" },
  { id: 2, name: "Alley", Email: "Alleyjhon@gmail.com", Role: "Region" },
  { id: 3, name: "alley", Email: "Alleyjhon@gmail.com", Role: "Region" },
  { id: 4, name: "Alley", Email: "Alleyjhon@gmail.com", Role: "Region" },
  { id: 5, name: "Alley", Email: "Alleyjhon@gmail.com", Role: "Region" },
  { id: 6, name: "Alley", Email: "Alleyjhon@gmail.com", Role: "Region" },
  { id: 7, name: "Alley", Email: "Alleyjhon@gmail.com", Role: "Region" },
];

// Role options for dropdown (you can customize these)
const ROLE_OPTIONS = [
  { value: "Region", label: "Region" },
  { value: "District", label: "District" },
  { value: "City", label: "City" },
  { value: "Admin", label: "Admin" },
  { value: "Manager", label: "Manager" },
];

const EditLine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Local state for lines
  const [lines, setLines] = useState(allLines);
  
  // Find the line to edit
  const line = lines.find((l) => l.id === Number(id));

  const [form, setForm] = useState({
    name: "",
    Email: "",
    Role: "Region",
  });

  // Initialize form when line is found
  useEffect(() => {
    if (line) {
      setForm({
        name: line.name || "",
        Email: line.Email || "",
        Role: line.Role || "Region",
      });
    }
  }, [line]);

  if (!line) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Line not found
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

    // Update the line in local state
    setLines((prev) =>
      prev.map((l) =>
        l.id === line.id ? { ...l, ...form } : l
      )
    );

    // Navigate back to lines list
    navigate("/Line");
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
          Edit Line
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Line Name
              </Typography>
              <TextField 
                fullWidth 
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Line Name" 
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
                placeholder="Email Address" 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Role
              </Typography>
              <FormControl fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}>
                <Select
                  name="Role"
                  value={form.Role}
                  onChange={handleChange}
                  displayEmpty
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

          <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            <Button type="submit" variant="contained">
              Update Line
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate("/Line")}
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