import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  useTheme,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useCompanies } from "../context/CompanyContext";
import { useCountries } from "../context/CountryContext";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const EditCompany = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  const { companies, updateCompany } = useCompanies();
  const { countries } = useCountries();

  const company = companies.find((c) => c.id_company == id);

  // Form state
  const [form, setForm] = useState({
    company_name: "",
    address: "",
    phone: "",
    created_at: "",
    Email: "",
    company_logo: "",
    transport_type: "",
    activity_domain: "",
    id_country: "",
  });

  // File upload state
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileName, setFileName] = useState("");

  // Load company data into form
  useEffect(() => {
    if (company) {
      setForm({
        company_name: company.company_name || "",
        address: company.address || "",
        phone: company.phone || "",
        created_at: company.created_at || "",
        Email: company.Email || "",
        company_logo: company.company_logo || "",
        transport_type: company.transport_type || "",
        activity_domain: company.activity_domain || "",
        id_country: company.id_country || "",
      });

      if (company.company_logo) setFileName(company.company_logo);
    }
  }, [company]);

  // Handle form field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setFileName(file.name);
      setForm({ ...form, company_logo: file.name });
    }
  };

  // Handle file removal
  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFileName("");
    setForm({ ...form, company_logo: "" });
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company) return;

    const updatedForm = {
      ...form,
      created_at: form.created_at || new Date().toLocaleDateString("en-GB"),
    };

    updateCompany(company.id_company, updatedForm);
    alert("Company updated successfully!");
    navigate("/Company");
  };

  if (!company) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Company not found
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/Company")}
        >
          Back
        </Button>
      </Box>
    );
  }


  return (
    <Box sx={{ width: "100%" }}>
      {/* HEADER SAME AS ADD COMPANY */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mt: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 4 }}>
          <Typography variant="h5" fontWeight="600">
            Welcome Back
          </Typography>
          <Box
            component="img"
            src="/assets/country/hand.png"
            alt="welcome icon"
            sx={{ width: 37, height: 37 }}
          />
        </Box>
      </Box>

      {/* FORM CARD SAME AS ADD COMPANY */}
      <Paper
        elevation={0}
        sx={{
          mt: 3,
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          backgroundColor:
            theme.palette.mode === "light" ? "#ffff" : "#1e1e2f",
        }}
      >
        <Typography variant="h6" fontWeight={700} sx={{ mb: 4 }}>
          Edit Company
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            {/* Company Name */}
            <Grid item xs={12} md={6}>
              <Typography fontWeight={600} sx={{ mb: 1 }}>
                Company Name
              </Typography>
              <TextField
                fullWidth
                name="company_name"
                value={form.company_name}
                onChange={handleChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    backgroundColor:
                      theme.palette.mode === "light"
                        ? "#F5F7FB"
                        : "#1e1e2f",
                    height: 50,
                  },
                }}
              />
            </Grid>

            {/* Company Logo */}
           <Grid item xs={12} md={6}>
        <Typography fontWeight={600} sx={{ mb: 1 }}>
          Company Logo
        </Typography>
        <TextField
          fullWidth
          type="file"
          onChange={handleFileUpload}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
               backgroundColor:
              theme.palette.mode === "light" ? "#F5F7FB" : "#1e1e2f",
              height: 50,
            },
          }}
        />
      </Grid>

            {/* Transport Type */}
            <Grid item xs={12} md={6}>
              <Typography fontWeight={600} sx={{ mb: 1 }}>
                Transport Type
              </Typography>
              <TextField
                fullWidth
                name="transport_type"
                value={form.transport_type}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    backgroundColor:
                      theme.palette.mode === "light"
                        ? "#F5F7FB"
                        : "#1e1e2f",
                    height: 50,
                  },
                }}
              />
            </Grid>

            {/* Country Dropdown */}
            <Grid item xs={12} md={6}>
              <Typography fontWeight={600} sx={{ mb: 1 }}>
                Country
              </Typography>
              <FormControl fullWidth>
                <Select
                  name="id_country"
                  value={form.id_country}
                  onChange={handleChange}
                  sx={{
                    borderRadius: 3,
                    backgroundColor:
                      theme.palette.mode === "light"
                        ? "#F5F7FB"
                        : "#1e1e2f",
                    height: 50,
                  }}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.id} value={country.id}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Email */}
            <Grid item xs={12} md={6}>
              <Typography fontWeight={600} sx={{ mb: 1 }}>
                Email *
              </Typography>
              <TextField
                fullWidth
                name="Email"
                value={form.Email}
                onChange={handleChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    backgroundColor:
                      theme.palette.mode === "light"
                        ? "#F5F7FB"
                        : "#1e1e2f",
                    height: 50,
                  },
                }}
              />
            </Grid>

            {/* Phone */}
            <Grid item xs={12} md={6}>
              <Typography fontWeight={600} sx={{ mb: 1 }}>
                Phone *
              </Typography>
              <TextField
                fullWidth
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    backgroundColor:
                      theme.palette.mode === "light"
                        ? "#F5F7FB"
                        : "#1e1e2f",
                    height: 50,
                  },
                }}
              />
            </Grid>

            {/* Address */}
            <Grid item xs={12}>
              <Typography fontWeight={600} sx={{ mb: 1 }}>
                Address *
              </Typography>
              <TextField
                fullWidth
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    backgroundColor:
                      theme.palette.mode === "light"
                        ? "#F5F7FB"
                        : "#1e1e2f",
                    height: 50,
                  },
                }}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 5 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                textTransform: "none",
                px: 5,
                py: 1.5,
                borderRadius: 3,
                backgroundColor: "#2563EB",
                fontWeight: 600,
              }}
            >
              Update
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EditCompany;
