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
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useCountries } from "../context/CountryContext";

const PAGE_SIZE = 4;

const Country = () => {
  const theme = useTheme();
  const { countries, deleteCountry } = useCountries();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this country?",
    );
    if (!confirmed) return;

    deleteCountry(id);

    if ((page - 1) * PAGE_SIZE >= countries.length - 1) {
      setPage((p) => Math.max(p - 1, 1));
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.region.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const currentCountries = filteredCountries.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );
  const pageCount = Math.ceil(filteredCountries.length / PAGE_SIZE);

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 2,
      }}
    >
      {/* Welcome Back + Icon + Search */}
      <Box
        sx={{
          mb: 4, // increase vertical space below this whole block
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mt: 2, // push this block a bit down from the top
        }}
      >
        {/* Left: Welcome Back + Icon */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1, // spacing between text and icon
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

        {/* Right: Search */}
        <TextField
          placeholder="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#9e9e9e" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            minWidth: { sm: 500, md: 727 },
            backgroundColor:
              theme.palette.mode === "light" ? "#F5F7FB" : "#1e1e2f",
            border: "1px solid #F5F7FB",
            borderRadius: 48,
            "& .MuiOutlinedInput-root": {
              borderRadius: 48,
            },
          }}
        />
      </Box>

      {/* Country + Add Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4, // more space below this block before table
          mt: 2, // optional small top margin for spacing from header above
        }}
      >
        {/* Left: Typography */}
        <Typography variant="h6" fontWeight="600">
          Country
        </Typography>

        {/* Right: Add Country Button */}
        <Button
          component={Link}
          to="/Country/add"
          variant="contained"
          sx={{
            height: 40,
            borderRadius: 3,
            backgroundColor: "#1467D9",
            color: "#ffffff",
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            boxShadow: "0px 4px 10px rgba(20, 103, 217, 0.25)",
            "&:hover": {
              backgroundColor: "#0f57b8",
              boxShadow: "0px 6px 14px rgba(20, 103, 217, 0.35)",
            },
          }}
        >
          Add Country
        </Button>
      </Box>

      {/* Main Table */}
      <TableContainer
        component={Paper}
        sx={{
          mb: 2,
          border: "1px solid #e0e0e0",
          borderRadius: 3,
          overflowX: "auto",
          backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
        }}
      >
        <Table sx={{ tableLayout: "fixed", width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 550, width: "10%" }}>#</TableCell>
              <TableCell sx={{ fontWeight: 550, width: "25%" }}>
                Country Name
              </TableCell>
              <TableCell sx={{ fontWeight: 550, width: "20%" }}>
                ISO or Internal Code
              </TableCell>
              <TableCell sx={{ fontWeight: 550, width: "30%" }}>
                Geographic Region Or Area
              </TableCell>
              <TableCell sx={{ fontWeight: 550, width: "15%" }}>
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
                <TableCell sx={{ width: "10%" }}>{country.id}</TableCell>
                <TableCell sx={{ width: "25%" }}>{country.name}</TableCell>
                <TableCell sx={{ width: "20%" }}>{country.code}</TableCell>
                <TableCell sx={{ width: "30%" }}>{country.region}</TableCell>
                <TableCell sx={{ width: "15%" }}>
                  <IconButton
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/Country/edit/${country.id}`}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(country.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

      {/* Country Display List */}
      <Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          Country Display
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
                <TableCell sx={{ fontWeight: 600 }}>List</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentCountries.map((country) => (
                <TableRow key={country.id}>
                  <TableCell>{country.id}</TableCell>
                  <TableCell>{country.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Country;
