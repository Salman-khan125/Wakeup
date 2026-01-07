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
    FormControl 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useBuses } from "../context/BusContext";

// Status options for dropdown
const STATUS_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Mantainence", label: "Mantainence" },
  { value: "Out of Service", label: "Out of Service" },
];

const AddBus = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    
    // Get addBus function from context
    const { addBus } = useBuses();
    
    // Form state for bus data
    const [form, setForm] = useState({
        number: "",
        seat: "",
        model: "",
        status: "Active",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addBus(form);
        alert("Bus added successfully!");
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
                {/* Title */}
                <Typography variant="h6" fontWeight={600}>
                    Add Bus
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5, mb: 3 }}
                >
                    Add a new bus to your system
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
                                name="number"
                                value={form.number}
                                onChange={handleChange}
                                placeholder="e.g., ale848"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 3,
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
                                name="seat"
                                value={form.seat}
                                onChange={handleChange}
                                placeholder="e.g., SL"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 3,
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
                                placeholder="e.g., Region"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 3,
                                    },
                                }}
                            />
                        </Grid>

                        {/* Bus Status (Dropdown) */}
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
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                                • Active: Available • Mantainence: In Transit • Out of Service: Maintenance
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