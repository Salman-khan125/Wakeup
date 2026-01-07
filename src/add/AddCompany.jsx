import React, { useState } from 'react';
import { 
    Box, 
    Typography, 
    TextField, 
    Button, 
    Grid, 
    Paper, 
    useTheme 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCompanies } from "../context/CompanyContext";

const AddCompany = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    
    const { addCompany } = useCompanies();
    
    const [form, setForm] = useState({
        name: "",
        address: "",
        contact: "",
        Registration: "",
        Email: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addCompany(form);
        alert("Company added successfully!");
        navigate("/Company");
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
                <Typography variant="h6" fontWeight={600}>
                    Add Company
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5, mb: 3 }}
                >
                    Add a new company to your system
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                                Company Name
                            </Typography>
                            <TextField
                                fullWidth
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Company Name"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 3,
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                                Head Office Address
                            </Typography>
                            <TextField
                                fullWidth
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="Address"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 3,
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                                Contact No
                            </Typography>
                            <TextField
                                fullWidth
                                name="contact"
                                value={form.contact}
                                onChange={handleChange}
                                placeholder="Contact No"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 3,
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                                Registration Date
                            </Typography>
                            <TextField
                                fullWidth
                                name="Registration"
                                value={form.Registration}
                                onChange={handleChange}
                                placeholder="DD/MM/YYYY"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 3,
                                    },
                                }}
                            />
                        </Grid>

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
                            Add Company
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate("/Company")}
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

export default AddCompany;