import React from "react";
import { Box, Typography, TextField, Button, Grid, Paper, useTheme } from "@mui/material";

const AddCompany = () => {
  const theme = useTheme();

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
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 3 }}>
          Fill in the information to add a new company
        </Typography>

        <TextField
          fullWidth
          placeholder="Search"
          sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
              Company Name
            </Typography>
            <TextField fullWidth placeholder="Company Name" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
              Head Office Address
            </Typography>
            <TextField fullWidth placeholder="Address" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
              Contact No
            </Typography>
            <TextField fullWidth placeholder="Contact" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
              Email
            </Typography>
            <TextField fullWidth placeholder="Email" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Button variant="contained" sx={{ textTransform: "none", px: 4, py: 1.2, borderRadius: 2 }}>
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddCompany;
