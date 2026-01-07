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
import { useCountries } from "../context/CountryContext";

const REGION_OPTIONS = [
  { value: "Region", label: "Region" },
  { value: "District", label: "District" },
  { value: "City", label: "City" },
  { value: "State", label: "State" },
  { value: "Province", label: "Province" },
];

const AddCountry = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    
    const { addCountry } = useCountries();
    
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
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
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
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
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
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                                Geographic Region
                            </Typography>
                            <FormControl fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}>
                                <Select
                                    name="region"
                                    value={form.region}
                                    onChange={handleChange}
                                >
                                    {REGION_OPTIONS.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
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
}

export default AddCountry;