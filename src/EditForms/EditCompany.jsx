import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  useTheme,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useCompanies } from "../context/CompanyContext";

const EditCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  
  const { companies, updateCompany } = useCompanies();
  
  const company = companies.find((c) => c.id === Number(id));

  const [form, setForm] = useState({
    name: "",
    address: "",
    contact: "",
    Registration: "",
    Email: "",
  });

  useEffect(() => {
    if (company) {
      setForm({
        name: company.name || "",
        address: company.address || "",
        contact: company.contact || "",
        Registration: company.Registration || "",
        Email: company.Email || "",
      });
    }
  }, [company]);

  if (!company) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Company not found
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate("/Company")}
          sx={{ mt: 2 }}
        >
          Back to Companies
        </Button>
      </Box>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCompany(company.id, form);
    alert("Company updated successfully!");
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
        <Typography variant="h5" mb={2}>
          Edit Company
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
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
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
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
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
                placeholder="Contact" 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
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
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
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
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            <Button type="submit" variant="contained">
              Update Company
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate("/Company")}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EditCompany;