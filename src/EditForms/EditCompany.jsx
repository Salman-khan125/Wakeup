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
  IconButton,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useCompanies } from "../context/CompanyContext";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

const EditCompany = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  const { companies, updateCompany } = useCompanies();

  // Debug: show what we're getting
  console.log("EditCompany - URL ID:", id);
  console.log("EditCompany - All companies:", companies);
  
  // Find company by id_company - use == for loose comparison
  const company = companies.find((c) => {
    console.log(`Checking: company.id_company=${c.id_company}, URL id=${id}, match? ${c.id_company == id}`);
    return c.id_company == id;
  });

  console.log("EditCompany - Found company:", company);

  // Form state - same field names as AddCompany.jsx
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

  // State for file upload
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileName, setFileName] = useState("");

  // Load company data into form when component mounts
  useEffect(() => {
    if (company) {
      console.log("Setting form with company data:", company);
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

      // If company has a logo, set the file name
      if (company.company_logo && company.company_logo !== "") {
        setFileName(company.company_logo);
      }
    }
  }, [company]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setFileName(file.name);
      // Store file name in form
      setForm({ ...form, company_logo: file.name });
    }
  };

  // Handle file removal
  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFileName("");
    setForm({ ...form, company_logo: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!company) {
      alert("Company not found!");
      return;
    }
    
    console.log("=== SUBMITTING UPDATE ===");
    console.log("Company ID to update:", company.id_company);
    console.log("Form data to update:", form);
    
    // Call updateCompany
    updateCompany(company.id_company, form);
    
    alert("Company updated successfully!");
    navigate("/Company");
  };

  if (!company) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Company not found (ID: {id})
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
          Available company IDs: {companies.map(c => c.id_company).join(', ')}
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
          Edit Company - {company.company_name} (ID: {company.id_company})
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5, mb: 3 }}
        >
          Edit company information
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Company Name */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Company Name
              </Typography>
              <TextField
                fullWidth
                name="company_name"
                value={form.company_name}
                onChange={handleChange}
                placeholder="Company Name"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              />
            </Grid>

            {/* Head Office Address */}
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
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              />
            </Grid>

            {/* Contact No */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Contact No
              </Typography>
              <TextField
                fullWidth
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Contact No"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              />
            </Grid>

            {/* Created At (Registration Date) */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Registration Date
              </Typography>
              <TextField
                fullWidth
                name="created_at"
                value={form.created_at}
                onChange={handleChange}
                placeholder="DD/MM/YYYY"
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
                Email Address
              </Typography>
              <TextField
                fullWidth
                name="Email"
                value={form.Email}
                onChange={handleChange}
                placeholder="Email"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              />
            </Grid>

            {/* Transport Type - Dropdown */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Transport Type
              </Typography>
              <FormControl
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              >
                <Select
                  name="transport_type"
                  value={form.transport_type}
                  onChange={handleChange}
                  sx={{ borderRadius: 3 }}
                >
                  <MenuItem value="private">Private</MenuItem>
                  <MenuItem value="public">Public</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Activity - Dropdown */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Activity
              </Typography>
              <FormControl
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              >
                <Select
                  name="activity_domain"
                  value={form.activity_domain}
                  onChange={handleChange}
                  sx={{ borderRadius: 3 }}
                >
                  <MenuItem value="personal">Personal</MenuItem>
                  <MenuItem value="tourism">Tourism</MenuItem>
                  <MenuItem value="education">Education</MenuItem>
                  <MenuItem value="private">Private</MenuItem>
                  <MenuItem value="mixed">Mixed</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Country */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Country
              </Typography>
              <TextField
                fullWidth
                name="id_country"
                value={form.id_country}
                onChange={handleChange}
                placeholder="Country name"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              />
            </Grid>

            {/* Company Logo - File Upload */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Company Logo
              </Typography>

              {/* File Upload Area */}
              <Box
                sx={{
                  border: `2px dashed ${theme.palette.mode === "light" ? "#ccc" : "#555"}`,
                  borderRadius: 3,
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 120,
                  backgroundColor:
                    theme.palette.mode === "light" ? "#fafafa" : "#2a2a3c",
                  position: "relative",
                  transition: "all 0.3s",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    backgroundColor:
                      theme.palette.mode === "light" ? "#f0f0f0" : "#333346",
                  },
                }}
              >
                {fileName || uploadedFile ? (
                  // File uploaded state
                  <Box sx={{ textAlign: "center", width: "100%" }}>
                    <Typography variant="body2" color="success.main">
                      ✓ {uploadedFile ? "New File Uploaded" : "Current Logo"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mt: 1, color: "text.secondary" }}
                    >
                      {uploadedFile ? fileName : company.company_logo}
                    </Typography>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={handleRemoveFile}
                      sx={{ mt: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ) : (
                  // Upload prompt
                  <>
                    <CloudUploadIcon
                      sx={{ fontSize: 40, color: "text.secondary", mb: 1 }}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                    >
                      Drag & drop logo image or
                    </Typography>
                    <Button
                      component="label"
                      variant="outlined"
                      size="small"
                      sx={{ mt: 1, borderRadius: 2 }}
                    >
                      Browse File
                      <input
                        type="file"
                        hidden
                        accept="image/*,.png,.jpg,.jpeg,.svg"
                        onChange={handleFileUpload}
                      />
                    </Button>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      Supports: PNG, JPG, JPEG, SVG
                    </Typography>
                  </>
                )}
              </Box>

              {/* OR select from existing logos */}
              <Typography
                variant="body2"
                sx={{ mt: 2, mb: 1, fontWeight: 700, color: "text.secondary" }}
              >
                Or select from existing logos:
              </Typography>
              <FormControl
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              >
                <Select
                  name="company_logo"
                  value={form.company_logo}
                  onChange={handleChange}
                  sx={{ borderRadius: 3 }}
                >
                  <MenuItem value="">No Logo</MenuItem>
                  <MenuItem value="logo1">Logo 1</MenuItem>
                  <MenuItem value="logo2">Logo 2</MenuItem>
                  <MenuItem value="logo3">Logo 3</MenuItem>
                  <MenuItem value="logo4">Logo 4</MenuItem>
                  <MenuItem value="logo5">Logo 5</MenuItem>
                  <MenuItem value="logo6">Logo 6</MenuItem>
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
              Update Company
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
};

export default EditCompany;