import React, { useState, useEffect } from "react";
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
import { useParams, useNavigate } from "react-router-dom";
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

// Country ID options (must match AddStop.jsx)
const COUNTRY_OPTIONS = [
  { value: 1, label: "USA" },
  { value: 2, label: "UK" },
  { value: 3, label: "Japan" },
  { value: 4, label: "France" },
  { value: 5, label: "Australia" },
];

const EditStop = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  
  const { stops, updateStop } = useStops();
  
  // UPDATED: Use id_stop instead of id for comparison
  const stop = stops.find((s) => s.id_stop === Number(id));

  // UPDATED: Using new field names
  const [form, setForm] = useState({
    stop_name: "",
    Latitude: "",
    longitude: "",
    city: "New York",
    qr_code: "Frame1", // Updated field name
    id_country: 1, // Added new field
  });

  // State for uploaded file
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (stop) {
      setForm({
        stop_name: stop.stop_name || "", // Updated field name
        Latitude: stop.Latitude || "",
        longitude: stop.longitude || "",
        city: stop.city || "New York",
        qr_code: stop.qr_code || "Frame1", // Updated field name
        id_country: stop.id_country || 1, // Added new field
      });
    }
  }, [stop]);

  if (!stop) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Stop not found
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate("/Stop")}
          sx={{ mt: 2 }}
        >
          Back to Stops
        </Button>
      </Box>
    );
  }

  const handleChange = (e) => {
    // Handle numeric fields
    if (e.target.name === "id_country") {
      setForm({ ...form, [e.target.name]: parseInt(e.target.value, 10) });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setFileName(file.name);
      
      // If user uploads a file, set qr_code to "custom"
      setForm({ ...form, qr_code: "custom" });
    }
  };

  // Handle file removal
  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFileName("");
    // Reset qr_code to existing value when file is removed
    setForm({ ...form, qr_code: stop.qr_code || "Frame1" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data to send (using new field names)
    const stopData = {
      stop_name: form.stop_name,
      Latitude: form.Latitude,
      longitude: form.longitude,
      city: form.city,
      qr_code: form.qr_code,
      id_country: form.id_country,
    };

    // If you uploaded a file, you might want to process it here
    if (uploadedFile) {
      console.log("Uploaded file:", uploadedFile);
      // You can convert to base64 or upload to server
    }

    // UPDATE STOP USING CONTEXT FUNCTION (now using id_stop)
    updateStop(stop.id_stop, stopData);

    // Navigate back to stops list
    navigate("/Stop");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 3, ml:3 }}>
        <Typography variant="h5" fontWeight="600">
          Edit Stop
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Edit stop information
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
                name="stop_name" // Updated field name
                value={form.stop_name}
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

            {/* Country ID */}
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Country *
              </Typography>
              <FormControl fullWidth sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}>
                <Select
                  name="id_country" // New field
                  value={form.id_country}
                  onChange={handleChange}
                  sx={{ borderRadius: 3 }}
                  required
                >
                  {COUNTRY_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label} (ID: {option.value})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* QR Code - File Upload */}
            {/* QR Code */}
<Grid item xs={12} md={6}>
  <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
    QR Code
  </Typography>

  <TextField
    fullWidth
    value={fileName}
    placeholder="Upload QR Code"
    InputProps={{
      readOnly: true,
      endAdornment: (
        <>
          {uploadedFile && (
            <IconButton size="small" onClick={handleRemoveFile}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
          <Button
            component="label"
            variant="contained"
            size="small"
            sx={{ ml: 1, borderRadius: 2 , backgroundColor:"#1467D9"}}
          >
            Browse
            <input
              type="file"
              hidden
              accept="image/*,.pdf,.png,.jpg,.jpeg"
              onChange={handleFileUpload}
            />
          </Button>
        </>
      ),
    }}
    sx={{
      "& .MuiOutlinedInput-root": {
        borderRadius: 3,
        backgroundColor:
          theme.palette.mode === "light" ? "#F5F7FB" : "#1e1e2f",
      },
    }}
  />
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
              Update Stop
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

export default EditStop;