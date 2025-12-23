import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Pagination,
  useTheme,
  Grid,
} from "@mui/material";


const AddUser = () => {
      const theme = useTheme();
  return (
    <Box>
         <Paper
        elevation={0}
        sx={{
          mt: 4,
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
        }}
      >
        {/* Title */}
        <Typography variant="h6" fontWeight={600}>
          Add Driver
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5, mb: 3 }}
        >
          Information about your current plan and usages
        </Typography>

        {/* Top Search */}
        <TextField
          fullWidth
          placeholder="Search"
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />

        {/* Form Fields */}
        <Grid container spacing={3}>
          {/* Countrynumber */}
          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
              First Name
            </Typography>
            <TextField
              fullWidth
              placeholder="Search"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />
          </Grid>

          {/* ISO or Internal Code */}
          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
              Last Name
            </Typography>
            <TextField
              fullWidth
              placeholder="Search"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />
             
             

          </Grid>

          {/* Geographic Region */}
          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
            Phone  Number
            </Typography>
            <TextField
              fullWidth
              placeholder="Search"
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
              placeholder="Search"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />
             

          </Grid>

           <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>
              License Number
            </Typography>
            <TextField
              fullWidth
              placeholder="Search"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            />
             

          </Grid>
        </Grid>

        {/* Submit Button */}
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              px: 4,
              py: 1.2,
              borderRadius: 2,
            }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
      
    </Box>
  )
}

export default AddUser
