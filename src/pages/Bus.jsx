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
import green from "../assets/bus/green.png";
import yellow from "../assets/bus/yellow.png";
import orange from "../assets/bus/orange.png";

const STATUS_IMAGE_MAP = {
  green,
  yellow,
  orange,
};
const STATUS_DIMENSIONS = {
  green: { width: "auto", height: 40 }, // square
  yellow: { width: "auto", height: 40 }, // wider
  orange: { width: "auto", height: 40 }, // wider
};

const allbuses = [
  { id: 1, number: "ale848", seat: "SL", model: "Region", status: "green" },
  { id: 2, number: "ale848", seat: "SL", model: "Region", status: "yellow" },
  { id: 3, number: "ale848", seat: "SL", model: "Region", status: "orange" },
  { id: 4, number: "ale848", seat: "SL", model: "Region", status: "green" },
  { id: 5, number: "ale848", seat: "SL", model: "Region", status: "orange" },
  { id: 6, number: "ale848", seat: "SL", model: "Region", status: "yellow" },
  // add more as needed
];

const PAGE_SIZE = 4; // show 4 countries per page

const Bus = () => {
  const theme = useTheme();
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  // calculate current page data
  const currentbuses = allbuses.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const pageCount = Math.ceil(allbuses.length / PAGE_SIZE);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Bus
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
          sx={{
            flex: 1,
            minWidth: 200,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />
        <Button variant="contained" sx={{ height: 40, borderRadius: 3 }}>
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
              <TableCell
                sx={{ fontWeight: 600, color: theme.palette.text.primary }}
              >
                #
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, color: theme.palette.text.primary }}
              >
                vehicle Number
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, color: theme.palette.text.primary }}
              >
                No of Seat
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, color: theme.palette.text.primary }}
              >
                Bus Model
              </TableCell>

              <TableCell
                sx={{ fontWeight: 600, color: theme.palette.text.primary }}
              >
                Bus status
              </TableCell>
              <TableCell
                sx={{ fontWeight: 600, color: theme.palette.text.primary }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentbuses.map((bus) => (
              <TableRow
                key={bus.id}
                sx={{
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "light" ? "#f5f5f5" : "#2c2c3e",
                  },
                }}
              >
                <TableCell>{bus.id}</TableCell>
                <TableCell>{bus.number}</TableCell>
                <TableCell>{bus.seat}</TableCell>
                <TableCell>{bus.model}</TableCell>

                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      component="img"
                      src={STATUS_IMAGE_MAP[bus.status]}
                      alt={bus.status}
                      sx={{
                        width: STATUS_DIMENSIONS[bus.status].width,
                        height: STATUS_DIMENSIONS[bus.status].height,
                        objectFit: "contain",
                      }}
                    />
                  </Box>
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

      {/* bus Display List (optional) */}
      <Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          Bus Display
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            overflowX: "auto",
            backgroundColor:
              theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 50 }}>#</TableCell>
                <TableCell
                  sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                >
                  List
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentbuses.map((bus) => (
                <TableRow key={bus.id}>
                  <TableCell>{bus.id}</TableCell>
                  <TableCell>{bus.number}</TableCell>
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
          Add Country
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
              Company Name
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
              Head Office Address
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
              Contact Number
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
             Email
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
              Geographic Region Or area
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

export default Bus;
