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
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

// Same data as in Bus.jsx
const allBuses = [
  { id: 1, number: "ale848", seat: "SL", model: "Region", status: "Active" },
  { id: 2, number: "ale848", seat: "SL", model: "Region", status: "maintenance" },
  { id: 3, number: "ale848", seat: "SL", model: "Region", status: "Out of Service" },
  { id: 4, number: "ale848", seat: "SL", model: "Region", status: "Active" },
  { id: 5, number: "ale848", seat: "SL", model: "Region", status: "Out of Service" },
  { id: 6, number: "ale848", seat: "SL", model: "Region", status: "maintenance" },
];

// Status options for dropdown
const STATUS_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "maintenance", label: "maintenance" },
  { value: "Out of Service", label: "Out of Service" },
];

const EditBus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Local state for buses
  const [buses, setBuses] = useState(allBuses);
  
  // Find the bus to edit
  const bus = buses.find((b) => b.id === Number(id));

  const [form, setForm] = useState({
    number: "",
    seat: "",
    model: "",
    status: "Active",
  });

  // Initialize form when bus is found
  useEffect(() => {
    if (bus) {
      setForm({
        number: bus.number || "",
        seat: bus.seat || "",
        model: bus.model || "",
        status: bus.status || "Active",
      });
    }
  }, [bus]);

  if (!bus) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Bus not found
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate("/Bus")}
          sx={{ mt: 2 }}
        >
          Back to Buses
        </Button>
      </Box>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the bus in local state
    setBuses((prev) =>
      prev.map((b) =>
        b.id === bus.id ? { ...b, ...form } : b
      )
    );

    // Navigate back to buses list
    navigate("/Bus");
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
          Edit Bus
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Vehicle Number
              </Typography>
              <TextField 
                fullWidth 
                name="number"
                value={form.number}
                onChange={handleChange}
                placeholder="e.g., ale848" 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Number of Seats
              </Typography>
              <TextField 
                fullWidth 
                name="seat"
                value={form.seat}
                onChange={handleChange}
                placeholder="e.g., SL" 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Bus Model
              </Typography>
              <TextField 
                fullWidth 
                name="model"
                value={form.model}
                onChange={handleChange}
                placeholder="e.g., Region" 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Bus Status
              </Typography>
              <FormControl fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}>
                <Select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  displayEmpty
                >
                  {STATUS_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                • Active: Available • maintenance: In Transit • Out of Service: Maintenance
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            <Button type="submit" variant="contained">
              Update Bus
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate("/Bus")}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EditBus;