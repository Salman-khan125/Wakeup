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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const allCountries = [
  { id: 1, name: "London", code: "SL", region: "Region" },
  { id: 2, name: "Paris", code: "FR", region: "Region" },
  { id: 3, name: "Tokyo", code: "JP", region: "Region" },
  { id: 4, name: "New York", code: "US", region: "Region" },
  { id: 5, name: "Berlin", code: "DE", region: "Region" },
  { id: 6, name: "Madrid", code: "ES", region: "Region" },
  { id: 7, name: "Rome", code: "IT", region: "Region" },
  // add more as needed
];

const PAGE_SIZE = 4; // show 4 countries per page

const Country = () => {
  const theme = useTheme();
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  // calculate current page data
  const currentCountries = allCountries.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const pageCount = Math.ceil(allCountries.length / PAGE_SIZE);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Country
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
          sx={{ flex: 1, minWidth: 200,  "& .MuiOutlinedInput-root": {
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
                Country Name
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                ISO or Internal Code
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Geographic Region Or area
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentCountries.map((country) => (
              <TableRow
                key={country.id}
                sx={{
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "light" ? "#f5f5f5" : "#2c2c3e",
                  },
                }}
              >
                <TableCell>{country.id}</TableCell>
                <TableCell>{country.name}</TableCell>
                <TableCell>{country.code}</TableCell>
                <TableCell>{country.region}</TableCell>
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

      {/* Country Display List (optional) */}
      <Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          Country Display
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
              {currentCountries.map((country) => (
                <TableRow  key={country.id}>
                  <TableCell >{country.id}</TableCell>
                  <TableCell >{country.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>s
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Country;
