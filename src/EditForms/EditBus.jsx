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
import { useBuses } from "../context/BusContext"; // ADD THIS

// Status options for dropdown
const STATUS_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Maintenance", label: "Maintenance" },
  { value: "Out of Service", label: "Out of Service" },
];

const EditBus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Get from context
  const { buses, updateBus } = useBuses();
  
  const bus = buses.find((b) => b.id === Number(id));

  const [form, setForm] = useState({
    number: "",
    seat: "",
    model: "",
    status: "Active",
  });

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
    updateBus(bus.id, form);
    alert("Bus updated successfully!");
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