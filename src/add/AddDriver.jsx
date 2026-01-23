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
    FormControl,
    Switch,
    FormControlLabel
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDrivers } from "../context/DriverContext";

const AddDriver = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    
    const { addDriver } = useDrivers();
    
    // Form state - MATCH Driver.jsx field names
    const [form, setForm] = useState({
        first_name: "",
        lastname: "",
        phone: "",
        Email: "",
        password: "",
        license: "",
        is_online: true,  // Boolean, not string
        id_company: "",
        id_bus: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox') {
            setForm({ ...form, [name]: checked });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate required fields
        if (!form.first_name || !form.lastname || !form.phone || !form.Email || !form.license) {
            alert("Please fill in all required fields!");
            return;
        }
        
        // Create driver data matching your Driver.jsx structure
        const driverData = {
            ...form,
            id_driver: Math.floor(Math.random() * 10000), // Temporary ID - backend should generate
            // Ensure is_online is boolean
            is_online: Boolean(form.is_online),
        };
        
        addDriver(driverData);
        alert("Driver added successfully!");
        navigate("/Driver");
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" fontWeight="600">
                    Add New Driver
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Add a new driver to your system
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
                        {/* First Name */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                                First Name *
                            </Typography>
                            <TextField
                                fullWidth
                                name="first_name"
                                value={form.first_name}
                                onChange={handleChange}
                                placeholder="John"
                                required
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
                                Last Name *
                            </Typography>
                            <TextField
                                fullWidth
                                name="lastname"
                                value={form.lastname}
                                onChange={handleChange}
                                placeholder="Doe"
                                required
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
                                Phone Number *
                            </Typography>
                            <TextField
                                fullWidth
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="+1234567890"
                                required
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
                                Email Address *
                            </Typography>
                            <TextField
                                fullWidth
                                name="Email"
                                type="email"
                                value={form.Email}
                                onChange={handleChange}
                                placeholder="john.doe@example.com"
                                required
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
                                License Number *
                            </Typography>
                            <TextField
                                fullWidth
                                name="license"
                                value={form.license}
                                onChange={handleChange}
                                placeholder="DL-123456"
                                required
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 3,
                                    },
                                }}
                            />
                        </Grid>

                        {/* Password */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                                Password *
                            </Typography>
                            <TextField
                                fullWidth
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Set password"
                                required
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 3,
                                    },
                                }}
                            />
                        </Grid>

                        {/* Company ID */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                                Company ID
                            </Typography>
                            <TextField
                                fullWidth
                                name="id_company"
                                type="number"
                                value={form.id_company}
                                onChange={handleChange}
                                placeholder="123"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 3,
                                    },
                                }}
                            />
                        </Grid>

                        {/* Bus ID */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                                Bus ID
                            </Typography>
                            <TextField
                                fullWidth
                                name="id_bus"
                                type="number"
                                value={form.id_bus}
                                onChange={handleChange}
                                placeholder="456"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 3,
                                    },
                                }}
                            />
                        </Grid>

                        {/* Status */}
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={form.is_online}
                                        onChange={handleChange}
                                        name="is_online"
                                        color="primary"
                                    />
                                }
                                label={`Status: ${form.is_online ? "Online" : "Offline"}`}
                            />
                        </Grid>
                    </Grid>

                    {/* Buttons */}
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
                            Add Driver
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate("/Driver")}
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
}

export default AddDriver;