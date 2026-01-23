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
import { useBuses } from "../context/BusContext";

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
  
  // FIX: Use id_bus instead of id
  const bus = buses.find((b) => b.id_bus === Number(id));

  const [form, setForm] = useState({
    plate_number: "", // FIX: Changed from playe_number to plate_number
    capacity: "", // FIX: Changed from seat to capacity
    model: "",
    status: "Active",
    id_company: "", // ADD: If you want to edit company too
  });

  useEffect(() => {
    if (bus) {
      setForm({
        plate_number: bus.plate_number || "", // FIX: Use correct field names
        capacity: bus.capacity || "", // FIX: Use capacity instead of seat
        model: bus.model || "",
        status: bus.status || "Active",
        id_company: bus.id_company || "", // ADD: If needed
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
    // FIX: Use id_bus instead of id
    updateBus(bus.id_bus, form);
    navigate("/Bus");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Edit Bus
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Edit bus information
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
                Vehicle Number *
              </Typography>
              <TextField 
                fullWidth 
                name="plate_number" // FIX: Changed from number to plate_number
                value={form.plate_number}
                onChange={handleChange}
                placeholder="e.g., ABC-123" 
                required
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Number of Seats *
              </Typography>
              <TextField 
                fullWidth 
                name="capacity" 
                value={form.capacity}
                onChange={handleChange}
                placeholder="e.g., 50" 
                type="number"
                required
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Bus Model *
              </Typography>
              <TextField 
                fullWidth 
                name="model"
                value={form.model}
                onChange={handleChange}
                placeholder="e.g., Volvo B9R" 
                required
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
                  sx={{ borderRadius: 3 }}
                >
                  {STATUS_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            
            { <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Company
              </Typography>
              <TextField 
                fullWidth 
                name="id_company"
                value={form.id_company}
                onChange={handleChange}
                placeholder="Company ID" 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid> }
          </Grid>

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
              Update Bus
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate("/Bus")}
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

export default EditBus;