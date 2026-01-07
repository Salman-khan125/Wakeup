import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  useTheme,
  MenuItem,
  Select,
  FormControl,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStops } from "../context/StopContext";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

// City options
const CITY_OPTIONS = [
  { value: "New York", label: "New York" },
  { value: "London", label: "London" },
  { value: "Tokyo", label: "Tokyo" },
  { value: "Paris", label: "Paris" },
  { value: "Sydney", label: "Sydney" },
];

const AddStop = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  const { addStop } = useStops();
  
  const [form, setForm] = useState({
    name: "",
    Latitude: "",
    longitude: "",
    city: "New York",
    qr: "Frame1", // Default QR value
  });

  // State for uploaded file
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
      
      // You can also preview the image if needed
      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   setFilePreview(reader.result);
      // };
      // reader.readAsDataURL(file);
    }
  };

  // Handle file removal
  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFileName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data to send
    const stopData = {
      ...form,
      // If you want to store the file, you might need to handle it differently
      // For now, we'll keep the QR value as is
    };

    // If you uploaded a file, you might want to process it here
    if (uploadedFile) {
      // You can convert to base64 or upload to server
      // For now, we'll just use the filename
      console.log("Uploaded file:", uploadedFile);
    }

    // ADD STOP USING CONTEXT FUNCTION
    addStop(stopData);

    // Navigate back to stops list
    navigate("/Stop");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Add Stop
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Add new stop information
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
            {/* Stop Name */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Stop Name *
              </Typography>
              <TextField
                fullWidth
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter stop name"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              />
            </Grid>

            {/* City */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                City
              </Typography>
              <FormControl fullWidth sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}>
                <Select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  sx={{ borderRadius: 3 }}
                >
                  {CITY_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Latitude */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Latitude *
              </Typography>
              <TextField
                fullWidth
                name="Latitude"
                value={form.Latitude}
                onChange={handleChange}
                placeholder="Enter latitude"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              />
            </Grid>

            {/* Longitude */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Longitude *
              </Typography>
              <TextField
                fullWidth
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
                placeholder="Enter longitude"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              />
            </Grid>

            {/* QR Code - File Upload */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                QR Codes
              </Typography>
              
              {/* File Upload Area */}
              <Box
                sx={{
                  border: `2px dashed ${theme.palette.mode === 'light' ? '#ccc' : '#555'}`,
                  borderRadius: 3,
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 120,
                  backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#2a2a3c",
                  position: "relative",
                  transition: "all 0.3s",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: theme.palette.mode === "light" ? "#f0f0f0" : "#333346",
                  }
                }}
              >
                {uploadedFile ? (
                  // File uploaded state
                  <Box sx={{ textAlign: "center", width: "100%" }}>
                    <Typography variant="body2" color="success.main">
                      ✓ File Uploaded
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                      {fileName}
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
                    <CloudUploadIcon sx={{ fontSize: 40, color: "text.secondary", mb: 1 }} />
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                      Drag & drop QR code image or
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
                        accept="image/*,.pdf,.png,.jpg,.jpeg"
                        onChange={handleFileUpload}
                      />
                    </Button>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                      Supports: PNG, JPG, JPEG, PDF
                    </Typography>
                  </>
                )}
              </Box>

              {/* OR use dropdown as alternative */}
              <Typography variant="body2" sx={{ mt: 2, mb: 1, fontWeight: 700, color: "text.secondary" }}>
                Or select from existing QR codes:
              </Typography>
              <FormControl fullWidth sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}>
                <Select
                  name="qr"
                  value={form.qr}
                  onChange={handleChange}
                  sx={{ borderRadius: 3 }}
                >
                  <MenuItem value="Frame1">Frame 1 (Default)</MenuItem>
                  <MenuItem value="Frame2">Frame 2</MenuItem>
                  <MenuItem value="custom">Custom Upload</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Box sx={{
            mt: 4,
            display: "flex",
            gap: 2,
            pt: 3,
            borderTop: `1px solid ${theme.palette.mode === 'light' ? '#e0e0e0' : '#333'}`
          }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                px: 4,
                py: 1.2,
                borderRadius: 2,
              }}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate("/Stop")}
              sx={{
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

export default AddStop;