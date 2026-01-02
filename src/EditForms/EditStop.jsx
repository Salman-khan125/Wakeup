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
  Input,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// Same data as in Stop.jsx
const allStops = [
  { id: 1, name: "Daroukhane", Latitude: "14.749862", longitude: "14.7498674", city: "New York", qr: "Frame1" },
  { id: 2, name: "Daroukhane", Latitude: "14.749862", longitude: "14.7498674", city: "New York", qr: "Frame2" },
  { id: 3, name: "Daroukhane", Latitude: "14.749862", longitude: "14.7498674", city: "New York", qr: "Frame1" },
  { id: 4, name: "Daroukhane", Latitude: "14.749862", longitude: "14.7498674", city: "New York", qr: "Frame1" },
  { id: 5, name: "Daroukhane", Latitude: "14.749862", longitude: "14.7498674", city: "New York", qr: "Frame2" },
  { id: 6, name: "Daroukhane", Latitude: "14.749862", longitude: "14.7498674", city: "New York", qr: "Frame1" },
];

// QR options for dropdown
const QR_OPTIONS = [
  { value: "Frame1", label: "Frame 1" },
  { value: "Frame2", label: "Frame 2" },
  { value: "custom", label: "Custom Upload" },
];

const EditStop = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Local state for stops
  const [stops, setStops] = useState(allStops);
  
  // Find the stop to edit
  const stop = stops.find((s) => s.id === Number(id));

  const [form, setForm] = useState({
    name: "",
    Latitude: "",
    longitude: "",
    city: "",
    qr: "Frame1",
  });

  // For uploaded file
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // Initialize form when stop is found
  useEffect(() => {
    if (stop) {
      setForm({
        name: stop.name || "",
        Latitude: stop.Latitude || "",
        longitude: stop.longitude || "",
        city: stop.city || "",
        qr: stop.qr || "Frame1",
      });
      
      // If stop has a custom image, show it
      if (stop.qr === "custom") {
        setPreviewUrl(`/uploads/${stop.id}.png`); // Adjust path as needed
      }
    }
  }, [stop]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "qr" && value === "custom") {
      // When selecting "custom", clear any existing QR
      setForm({ ...form, [name]: value });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      
      // Create preview URL
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      
      // Set form to use custom QR
      setForm({ ...form, qr: "custom" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // In a real app, you would:
    // 1. Upload the file to server if uploadedFile exists
    // 2. Get the file URL from server response
    // 3. Save that URL in your stop data
    
    // For now, we'll just simulate it
    let finalQrValue = form.qr;
    
    if (uploadedFile) {
      // In reality, you'd get a URL from your server
      finalQrValue = `custom_${Date.now()}`; // Simulate custom QR
      console.log("Would upload file:", uploadedFile.name);
    }

    // Update the stop with final QR value
    const updatedStop = { ...stop, ...form, qr: finalQrValue };
    
    setStops((prev) =>
      prev.map((s) =>
        s.id === stop.id ? updatedStop : s
      )
    );

    // Show success message
    alert("Stop updated! (Note: File upload would happen on a real server)");
    
    // Navigate back to stops list
    navigate("/Stop");
  };

  const getQrImageUrl = () => {
    if (previewUrl) {
      return previewUrl;
    }
    
    if (form.qr === "custom") {
      return "/assets/stop/default.png"; // Default if no upload
    }
    
    return `/assets/stop/${form.qr}.png`;
  };

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
          Edit Stop
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Stop Name
              </Typography>
              <TextField 
                fullWidth 
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Stop Name" 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Latitude
              </Typography>
              <TextField 
                fullWidth 
                name="Latitude"
                value={form.Latitude}
                onChange={handleChange}
                placeholder="Latitude" 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                Longitude
              </Typography>
              <TextField 
                fullWidth 
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
                placeholder="Longitude" 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                City
              </Typography>
              <TextField 
                fullWidth 
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City Name" 
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} 
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
                QR Code
              </Typography>
              
              <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
                {/* Current QR Preview */}
                <Box sx={{ minWidth: 120 }}>
                  <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
                    Current QR:
                  </Typography>
                  <Box
                    component="img"
                    src={getQrImageUrl()}
                    alt="QR Code"
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: "contain",
                      border: "1px solid #ddd",
                      borderRadius: 1,
                      backgroundColor: "white",
                      p: 1,
                    }}
                  />
                </Box>
                
                {/* QR Selection */}
                <Box sx={{ flex: 1, minWidth: 200 }}>
                  <FormControl fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 }, mb: 2 }}>
                    <Select
                      name="qr"
                      value={form.qr}
                      onChange={handleChange}
                    >
                      {QR_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  {/* File Upload (only show when custom is selected) */}
                  {form.qr === "custom" && (
                    <Box>
                      <Button
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        sx={{ borderRadius: 3, mb: 1 }}
                      >
                        Upload QR Image
                        <Input
                          type="file"
                          inputProps={{ accept: "image/*" }}
                          onChange={handleFileUpload}
                          sx={{ display: "none" }}
                        />
                      </Button>
                      
                      {uploadedFile && (
                        <Typography variant="caption" color="success.main" sx={{ display: "block", ml: 1 }}>
                          ✓ {uploadedFile.name}
                        </Typography>
                      )}
                      
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                        Upload a custom QR code image (PNG, JPG)
                      </Typography>
                    </Box>
                  )}
                  
                  {form.qr !== "custom" && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                      Select from available QR code designs
                    </Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            <Button type="submit" variant="contained">
              Update Stop
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate("/Stop")}
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