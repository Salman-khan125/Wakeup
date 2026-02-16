import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  useTheme,
  MenuItem,
  Select,
  FormControl,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useCountries } from "../context/CountryContext";

const REGION_OPTIONS = [
  { value: "Africa", label: "Africa" },
  { value: "East Africa", label: "East Africa" },
  { value: "West Africa", label: "West Africa" },
  { value: "North Africa", label: "North Africa" },
  { value: "Central Africa", label: "Central Africa" },
  { value: "Southern Africa", label: "Southern Africa" },

  { value: "Asia", label: "Asia" },
  { value: "East Asia", label: "East Asia" },
  { value: "South Asia", label: "South Asia" },
  { value: "Southeast Asia", label: "Southeast Asia" },
  { value: "Central Asia", label: "Central Asia" },
  { value: "Western Asia (Middle East)", label: "Western Asia (Middle East)" },

  { value: "Europe", label: "Europe" },
  { value: "Western Europe", label: "Western Europe" },
  { value: "Eastern Europe", label: "Eastern Europe" },
  { value: "Northern Europe", label: "Northern Europe" },
  { value: "Southern Europe", label: "Southern Europe" },

  { value: "North America", label: "North America" },
  { value: "Central America", label: "Central America" },
  { value: "Caribbean", label: "Caribbean" },

  { value: "South America", label: "South America" },

  { value: "Oceania", label: "Oceania" },
  { value: "Australia & New Zealand", label: "Australia & New Zealand" },
  { value: "Melanesia", label: "Melanesia" },
  { value: "Micronesia", label: "Micronesia" },
  { value: "Polynesia", label: "Polynesia" }
];


const AddCountry = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { addCountry } = useCountries();

  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState({
    name: "",
    code: "",
    region: "Region",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCountry(form);
    alert("Country added successfully!");
    navigate("/Country");
  };

  return (
    <Box sx={{ width: "100%" }}>
      
      {/* Header + Search (Same as Country page) */}
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
        {/* Left: Welcome Back + Icon */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
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

        {/* Right: Search */}
        <TextField
          placeholder="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#9e9e9e" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            minWidth: { sm: 500, md: 727 },
            backgroundColor:
              theme.palette.mode === "light" ? "#F5F7FB" : "#1e1e2f",
            border: "1px solid #F5F7FB",
            borderRadius: 48,
            "& .MuiOutlinedInput-root": {
              borderRadius: 48,
            },
          }}
        />
      </Box>

      <Paper
        elevation={0}
        sx={{
          mt: 4,
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          backgroundColor:
            theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Add Country
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5, mb: 3 }}
        >
          Add a new country to your system
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="body2"
                sx={{ mb: 1, fontWeight: 700 }}
              >
                Country Name
              </Typography>
              <TextField
                fullWidth
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g., London"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    backgroundColor: "#F5F7FB",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="body2"
                sx={{ mb: 1, fontWeight: 700 }}
              >
                Country Code
              </Typography>
              <TextField
                fullWidth
                name="code"
                value={form.code}
                onChange={handleChange}
                placeholder="e.g., SL"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    backgroundColor: "#F5F7FB",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="body2"
                sx={{ mb: 1, fontWeight: 700 }}
              >
                Geographic Region
              </Typography>
              <FormControl
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    backgroundColor: "#F5F7FB",
                  },
                }}
              >
                <Select
                  name="region"
                  value={form.region}
                  onChange={handleChange}
                >
                  {REGION_OPTIONS.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                textTransform: "none",
                px: 4,
                py: 1.2,
                borderRadius: 2,
              }}
            >
              Add Country
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/Country")}
              sx={{
                textTransform: "none",
                px: 4,
                py: 1.2,
                borderRadius: 2,
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

export default AddCountry;
