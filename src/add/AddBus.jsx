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
import { useNavigate } from "react-router-dom";

import { useBuses } from "../context/BusContext";

// Status options for dropdown
const STATUS_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Maintenance", label: "Maintenance" },
  { value: "Out of Service", label: "Out of Service" },
];

const AddBus = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Get addBus function from context
  const { addBus } = useBuses();

  // Form state for bus data - use correct field names
  const [form, setForm] = useState({
    plate_number: "", // Changed from "number"
    capacity: "", // Changed from "seat"
    model: "",
    status: "Active",
    id_company: "", // Added this field
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form:", form); // Debug log
    addBus(form);
    alert("Bus added successfully!");
    navigate("/Bus");
  };

  return (
    <Box sx={{ width: "100%" }}>

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
            ml:3,
          }}
        >
          <Typography variant="h5" fontWeight="600" >
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
          mt: 4,
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
        }}
      >
        {/* Title */}
        <Typography variant="h6" fontWeight={600} sx={{mb:5}}>
          Add Bus
        </Typography>

       

        {/* Form with onSubmit handler */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Vehicle Number */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Vehicle Number
              </Typography>
              <TextField
                fullWidth
                name="plate_number" // Changed to match form state
                value={form.plate_number} // Changed to match form state
                onChange={handleChange}
                placeholder="e.g., ABC-123"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                     backgroundColor:
              theme.palette.mode === "light" ? "#F5F7FB" : "#1e1e2f",
                  },
                }}
              />
            </Grid>

            {/* Number of Seats */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Number of Seats
              </Typography>
              <TextField
                fullWidth
                name="capacity" // Changed to match form state
                value={form.capacity} // Changed to match form state
                onChange={handleChange}
                placeholder="e.g., 50"
                type="number"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                     backgroundColor:
              theme.palette.mode === "light" ? "#F5F7FB" : "#1e1e2f",
                  },
                }}
              />
            </Grid>

            {/* Bus Model */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Bus Model
              </Typography>
              <TextField
                fullWidth
                name="model"
                value={form.model}
                onChange={handleChange}
                placeholder="e.g., Volvo B9R"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                     backgroundColor:
              theme.palette.mode === "light" ? "#F5F7FB" : "#1e1e2f",
                  },
                }}
              />
            </Grid>

            {/* Bus Status (Dropdown) */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Bus Status
              </Typography>
              <FormControl
                fullWidth
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3, backgroundColor:
              theme.palette.mode === "light" ? "#F5F7FB" : "#1e1e2f", } }}
              >
                <Select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  {STATUS_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1, display: "block" }}
              >
                • Active: Available • Maintenance: In Transit • Out of Service:
                Maintenance
              </Typography>
            </Grid>

           
          </Grid>

          {/* Submit Button */}
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
              Add Bus
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/Bus")}
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

export default AddBus;
