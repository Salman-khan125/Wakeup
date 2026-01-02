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

// Define countries data (copy from your Country.jsx)
const allCountries = [
  { id: 1, country: "Ethiopia", code: "ET", region: "region" },
  { id: 2, country: "Kenya", code: "KE", region: "regio" },
  { id: 3, country: "Sudan", code: "SD", region: "region" },
  { id: 4, country: "Somalia", code: "SO", region: "region" },
  { id: 5, country: "Eritrea", code: "ER", region: "region" },
  { id: 6, country: "Djibouti", code: "DJ", region: "region" },
  // Add more countries as needed
];

const EditCountry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Local state for countries
  const [countries, setCountries] = useState(allCountries);
  
  // Find the country to edit
  const country = countries.find((c) => c.id === Number(id));

  const [form, setForm] = useState({
    country: "",
    code: "",
    region:"",
  });

  // Initialize form when country is found
  useEffect(() => {
    if (country) {
      setForm({
        country: country.country || "",
        code: country.code || "",
        region:country.region || "",
      });
    }
  }, [country]);

  if (!country) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Country not found
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate("/Country")}
          sx={{ mt: 2 }}
        >
          Back to Countries
        </Button>
      </Box>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the country in local state
    setCountries((prev) =>
      prev.map((c) =>
        c.id === country.id ? { ...c, ...form } : c
      )
    );

    // Navigate back to countries list
    navigate("/Country");
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
          Edit Country
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Country Name
              </Typography>
              <TextField 
                fullWidth 
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Country Name" 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Country Code
              </Typography>
              <TextField 
                fullWidth 
                name="code"
                value={form.code}
                onChange={handleChange}
                placeholder="Country Code (e.g., ET)" 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>
            
             <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Geographic Region Or area
              </Typography>
              <TextField 
                fullWidth 
                name="region"
                value={form.region}
                onChange={handleChange}
                placeholder="Country Code (e.g., ET)" 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

          </Grid>

          <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            <Button type="submit" variant="contained">
              Update Country
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate("/Country")}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EditCountry;