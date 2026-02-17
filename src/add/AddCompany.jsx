import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useCompanies } from "../context/CompanyContext";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useCountries } from "../context/CountryContext";


const AddCompany = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { countries } = useCountries();


  const { addCompany } = useCompanies();

  // Form state - changed field names to match CompanyContext
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
    
    console.log("Submitting company form:", form);
    
    // Format the date if needed
    const formattedForm = {
      ...form,
      created_at: form.created_at || new Date().toLocaleDateString('en-GB') // DD/MM/YYYY format
    };
    
    addCompany(formattedForm);
    alert("Company added successfully!");
    navigate("/Company");
  };

  return (
    <Box sx={{ width: "100%" }}>
     
     {/* Header (Same as AddCountry page) */}
{/* Header */}
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
  {/* LEFT SIDE */}
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1,
      ml: 3,
    }}
  >
    <Typography variant="h5" fontWeight="600">
      Welcome Back
    </Typography>

    <Box
      component="img"
      src="/assets/country/hand.png"
      alt="welcome icon"
      sx={{
        width: 37,
        height: 37,
        objectFit: "contain",
      }}
    />
  </Box>

  {/* RIGHT SIDE - COUNTRY DROPDOWN */}
  <FormControl sx={{ mr: 3 }}>
    <Select
      name="id_country"
      value={form.id_country}
      onChange={handleChange}
      IconComponent={KeyboardArrowDownIcon}
      sx={{
        minWidth: 200,
        borderRadius: 5,
        backgroundColor:
          theme.palette.mode === "light" ? "#F5F7FB" : "#1e1e2f",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "& .MuiSelect-select": {
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          py: 1.2,
        },
      }}
      renderValue={(selected) => {
        const selectedCountry = countries?.find(
          (c) => c.id === selected
        );

        if (!selectedCountry) return "Select Country";

        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              component="img"
              src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
// must exist in your data
              alt={selectedCountry.name}
              sx={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <Typography fontWeight={500}>
              {selectedCountry.name}
            </Typography>
          </Box>
        );
      }}
    >
      {countries?.map((country) => (
        <MenuItem key={country.id} value={country.id}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              component="img"
              src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
              alt={country.name}
              sx={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            {country.name}
          </Box>
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Box>




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
    Add Company
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
          placeholder="Company Name"
          required
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

      {/* Logo URL */}
      <Grid item xs={12} md={6}>
        <Typography fontWeight={600} sx={{ mb: 1 }}>
          Logo URL (Optional)
        </Typography>
        <TextField
          fullWidth
          name="company_logo"
          value={form.company_logo}
          onChange={handleChange}
          placeholder="URL"
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
          placeholder="Transport Type"
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

      {/* Section Title */}
      <Grid item xs={12}>
        <Typography variant="h6" fontWeight={700} sx={{ mt: 2 }}>
          Basic Information
        </Typography>
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
          placeholder="Email"
          required
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
          placeholder="Company Name"
          required
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

      {/* Address */}
      <Grid item xs={12} md={6}>
        <Typography fontWeight={600} sx={{ mb: 1 }}>
          Address *
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
               backgroundColor:
              theme.palette.mode === "light" ? "#F5F7FB" : "#1e1e2f",
              height: 50,
            },
          }}
        />
      </Grid>
    </Grid>

    {/* Submit Button */}
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
        Submit
      </Button>
    </Box>
  </form>
</Paper>

    </Box>
  );
};

export default AddCompany;