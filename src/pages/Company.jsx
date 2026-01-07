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
import { Link } from "react-router-dom";
import { useCompanies } from "../context/CompanyContext"; // ADD THIS

const PAGE_SIZE = 4;

const Company = () => {
  const theme = useTheme();
  
  // GET DATA FROM CONTEXT
  const { companies, deleteCompany } = useCompanies();
  
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this company?"
    );
    if (!confirmed) return;

    // USE CONTEXT FUNCTION
    deleteCompany(id);

    if ((page - 1) * PAGE_SIZE >= companies.length - 1) {
      setPage((p) => Math.max(p - 1, 1));
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };
       
        const filteredCompanies = companies.filter(company =>
  company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  company.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
  company.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
  company.Registration.toLowerCase().includes(searchTerm.toLowerCase()) ||
  company.Email.toLowerCase().includes(searchTerm.toLowerCase())
);
  const currentCompanies = filteredCompanies.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageCount = Math.ceil(filteredCompanies.length / PAGE_SIZE);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Company
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
          value ={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}

          sx={{
            flex: 1,
            minWidth: 200,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />
        <Button
          component={Link}
          to="/Company/add"
          variant="contained"
          sx={{ height: 40, borderRadius: 3 }}
        >
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
      Company Name
    </TableCell>
    <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
      Head Office Address
    </TableCell>
    <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
      Contact No
    </TableCell>
    <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
      Registration Date
    </TableCell>
    <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
      Email Address
    </TableCell>
    <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
      Action
    </TableCell>
  </TableRow>
</TableHead>
          <TableBody>
            {currentCompanies.map((company) => (
              <TableRow
                key={company.id}
                sx={{
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "light" ? "#f5f5f5" : "#2c2c3e",
                  },
                }}
              >
      <TableCell>{company.id}</TableCell>
      <TableCell>{company.name}</TableCell>
      <TableCell>{company.address}</TableCell>
      <TableCell>{company.contact}</TableCell>
      <TableCell>{company.Registration}</TableCell>
      <TableCell>{company.Email}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/Company/edit/${company.id}`}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(company.id)}
                  >
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
      <Box>
  <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
    company Display
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
        {currentCompanies.map((company) => (
          <TableRow key={company.id}>
            <TableCell>{company.id}</TableCell>
            <TableCell>{company.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</Box>
    </Box>
  );
};

export default Company;