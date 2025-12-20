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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


const STATUS_IMAGE_MAP = {
  online: "/assets/driver/offline.png",
  offline: "/assets/driver/online.png",
};


const alldrivers = [
  { id: 1, name: "Allley", lastname: "jhone", contact: "+00*******",Email:"AlleyJhone", license:"0947563", status:"online" },
  { id: 2, name: "Allley", lastname: "jhone", contact: "+00*******",Email:"AlleyJhone",license:"0947563",status:"online" },
  { id: 3, name: "Allley", lastname: "jhone", contact: "+00*******",Email:"AlleyJhone",license:"0947563",status:"offline" },
  { id: 4, name: "Allley", lastname: "jhone", contact: "+00*******",Email:"AlleyJhone",license:"0947563",status:"online" },
  { id: 5, name: "Allley", lastname: "jhone", contact: "+00*******",Email:"AlleyJhone",license:"0947563",status:"offline" },
  { id: 6, name: "Allley", lastname: "jhone", contact: "+00*******",Email:"AlleyJhone",license:"0947563",status:"online" },
  // add more as needed
];

const PAGE_SIZE = 4; // show 4 countries per page

const Driver = () => {
  const theme = useTheme();
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  // calculate current page data
  const currentdriver = alldrivers.slice(
    (page - 1) * PAGE_SIZE ,
    page * PAGE_SIZE
  );

  const pageCount = Math.ceil(alldrivers.length / PAGE_SIZE);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Driver
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Information about your current plan and usages
        </Typography>
      </Box>

      {/* Search + Add */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
          backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
          
        }}
      >
      
        <TextField
          placeholder="Search"
          variant="outlined"
          size="small"
          sx={{ flex: 1, minWidth: 200, "& .MuiOutlinedInput-root": {
            borderRadius: 3,
          }, }}
        />
        <Button variant="contained" sx={{ height: 40, borderRadius:3 }}>
          + Add
        </Button>
      </Box>

      {/* Main Table */}
      <TableContainer
        component={Paper}
        sx={{
          mb: 2,
          borderRadius: 2,
          overflowX: "auto",
         
          backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                #
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                First Name
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
               Last Name
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Contact No
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Email
              </TableCell>
               <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                License No
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Action
              </TableCell>
               
            </TableRow>
          </TableHead>
          <TableBody>
            {currentdriver.map((driver) => (
              <TableRow
                key={driver.id}
                sx={{
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "light" ? "#f5f5f5" : "#2c2c3e",
                  },
                }}
              >
                <TableCell>{driver.id}</TableCell>
                <TableCell>{driver.name}</TableCell>
                <TableCell>{driver.lastname}</TableCell>
                <TableCell>{driver.contact}</TableCell>                
                <TableCell>{driver.Email}</TableCell>
                <TableCell>{driver.license}</TableCell>
                
                <TableCell>
  <Box
    component="img"
    src={STATUS_IMAGE_MAP[driver.status]}
    alt={driver.status}
    sx={{
      width: 48,
      height: 48,
      objectFit: "contain",
    }}
  />
</TableCell>


                <TableCell>
                  <IconButton size="small" color="primary">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {pageCount > 1 && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handleChange}
            color="primary"
            
          />
        </Box>
      )}

      {/* driver Display List (optional) */}
      <Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          driver Display
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            overflowX: "auto",
            backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 50 }}>#</TableCell>
                <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>List</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentdriver.map((driver) => (
                <TableRow  key={driver.id}>
                  <TableCell >{driver.id}</TableCell>
                  <TableCell>{driver.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
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
  );
};

export default Driver;
