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
import { useCountries } from "../context/CountryContext";

// Region options for dropdown
const REGION_OPTIONS = [
  { value: "Region", label: "Region" },
  { value: "District", label: "District" },
  { value: "City", label: "City" },
  { value: "State", label: "State" },
  { value: "Province", label: "Province" },
];

const EditCountry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  
  console.log("=== DEBUG EDITCOUNTRY ===");
  console.log("Country ID from URL:", id);
  
  // Add error handling for the hook
  let countries, updateCountry;
  
  try {
    const context = useCountries();
    countries = context.countries;
    updateCountry = context.updateCountry;
    console.log("Countries from context:", countries);
    console.log("Is countries an array?", Array.isArray(countries));
    console.log("Countries length:", countries?.length);
  } catch (error) {
    console.error("ERROR in useCountries():", error.message);
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Context Error: {error.message}
        </Typography>
        <Typography variant="body2">
          This means CountryProvider is not properly set up in main.jsx
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
  
  // Add safety check
  if (!countries || !Array.isArray(countries)) {
    console.error("Countries is not an array:", countries);
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Data Error: Countries data is not available
        </Typography>
        <Typography variant="body2">
          countries is: {typeof countries}
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
  
  const country = countries.find((c) => c.id === Number(id));
  console.log("Found country:", country);

  const [form, setForm] = useState({
    name: "",
    code: "",
    region: "Region",
  });

  useEffect(() => {
    if (country) {
      setForm({
        name: country.name || "",
        code: country.code || "",
        region: country.region || "Region",
      });
    }
  }, [country]);

  if (!country) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Country not found (ID: {id})
        </Typography>
        <Typography variant="body2">
          Available IDs: {countries.map(c => c.id).join(", ")}
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
    updateCountry(country.id, form);
    alert("Country updated successfully!");
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
          Edit Country: {country.name}
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Country Name
              </Typography>
              <TextField 
                fullWidth 
                name="name"
                value={form.name}
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
                placeholder="Country Code (e.g., SL)" 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Geographic Region
              </Typography>
              <FormControl fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}>
                <Select
                  name="region"
                  value={form.region}
                  onChange={handleChange}
                >
                  {REGION_OPTIONS.map((option) => (
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