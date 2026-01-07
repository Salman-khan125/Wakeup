import React, { useState } from 'react';
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
import { useDrivers } from "../context/DriverContext";

// Status options for dropdown
const STATUS_OPTIONS = [
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
];

const AddDriver = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    
    // Get addDriver function from context
    const { addDriver } = useDrivers();
    
    // Form state
    const [form, setForm] = useState({
        name: "",
        lastname: "",
        contact: "",
        Email: "",
        license: "",
        status: "online",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addDriver(form);
        alert("Driver added successfully!");
        navigate("/Driver");
    };

    return (
        <Box sx={{ width: "100%" }}> {/* Fixed: Box not box */}
            <Paper
                elevation={0}
                sx={{
                    mt: 4,
                    p: { xs: 2, md: 3 },
                    borderRadius: 3,
                    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
                }}
            >
                <Typography variant="h6" fontWeight={600}>
                    Add Driver
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5, mb: 3 }}
                >
                    Add a new driver to your system
                </Typography>

                {/* Form with onSubmit handler */}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* First Name */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                                First Name
                            </Typography>
                            <TextField
                                fullWidth
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="First Name"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 3,
                                    },
                                }}
                            />
                        </Grid>

                        {/* Last Name */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                                Last Name
                            </Typography>
                            <TextField
                                fullWidth
                                name="lastname"
                                value={form.lastname}
                                onChange={handleChange}
                                placeholder="Last Name"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 3,
                                    },
                                }}
                            />
                        </Grid>

                        {/* Phone Number */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                                Phone Number
                            </Typography>
                            <TextField
                                fullWidth
                                name="contact"
                                value={form.contact}
                                onChange={handleChange}
                                placeholder="+00*******"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 3,
                                    },
                                }}
                            />
                        </Grid>

                        {/* Email Address */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                                Email Address
                            </Typography>
                            <TextField
                                fullWidth
                                name="Email"
                                value={form.Email}
                                onChange={handleChange}
                                placeholder="Email"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 3,
                                    },
                                }}
                            />
                        </Grid>

                        {/* License Number */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                                License Number
                            </Typography>
                            <TextField
                                fullWidth
                                name="license"
                                value={form.license}
                                onChange={handleChange}
                                placeholder="License Number"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 3,
                                    },
                                }}
                            />
                        </Grid>

                        {/* Status (Dropdown) */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                                Status
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
                            Add Driver
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate("/Driver")}
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
}

export default AddDriver;