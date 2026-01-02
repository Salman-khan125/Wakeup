import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddCountry = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    
    // State for form fields based on Country.jsx data structure
    const [form, setForm] = useState({
        country: "",
        code: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Here you would normally:
        // 1. Save to your state/context
        // 2. Or send to an API
        // 3. Generate a new ID
        
        console.log("Country data to add:", form);
        
        // For now, just show success and navigate back
        alert("Country added successfully!");
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
                {/* Title */}
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

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Form Fields */}
                    <Grid container spacing={3}>
                        {/* Country Name */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                                Country Name
                            </Typography>
                            <TextField
                                fullWidth
                                name="country"
                                value={form.country}
                                onChange={handleChange}
                                placeholder="e.g., Ethiopia"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 3,
                                    },
                                }}
                            />
                        </Grid>

                        {/* ISO or Internal Code */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                                Country Code
                            </Typography>
                            <TextField
                                fullWidth
                                name="code"
                                value={form.code}
                                onChange={handleChange}
                                placeholder="e.g., ET"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 3,
                                    },
                                }}
                            />
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
}

export default AddCountry;