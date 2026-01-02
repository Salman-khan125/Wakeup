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
import { Link } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const initialCompanies = [
  {
    id: 1,
    name: "Co founder",
    address: "Mainroad near st haul school",
    contact: "+00*******",
    Registration: "16/12/2025",
    Email: "AlleyJhone",
  },
  {
    id: 2,
    name: "Co founder",
    address: "Mainroad near st haul school",
    contact: "+00*******",
    Registration: "16/12/2025",
    Email: "AlleyJhone",
  },
  {
    id: 3,
    name: "Co founder",
    address: "Mainroad near st haul school",
    contact: "+00*******",
    Registration: "16/12/2025",
    Email: "AlleyJhone",
  },
  {
    id: 4,
    name: "Co founder",
    address: "Mainroad near st haul school",
    contact: "+00*******",
    Registration: "16/12/2025",
    Email: "AlleyJhone",
  },
  {
    id: 5,
    name: "Co founder",
    address: "Mainroad near st haul school",
    contact: "+00*******",
    Registration: "16/12/2025",
    Email: "AlleyJhone",
  },
  {
    id: 6,
    name: "Co founder",
    address: "Mainroad near st haul school",
    contact: "+00*******",
    Registration: "16/12/2025",
    Email: "AlleyJhone",
  },
];

const PAGE_SIZE = 4;

const Company = () => {
  const theme = useTheme();
  const [companies, setCompanies] = useState(initialCompanies);
  const [page, setPage] = useState(1);

  const handleChange = (_, value) => setPage(value);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this company?"
    );
    if (!confirmed) return;

    setCompanies((prev) => prev.filter((c) => c.id !== id));

    if ((page - 1) * PAGE_SIZE >= companies.length - 1) {
      setPage((p) => Math.max(p - 1, 1));
    }
  };

  const currentCompanies = companies.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const pageCount = Math.ceil(companies.length / PAGE_SIZE);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>
          Company
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Information about your current plan and usages
        </Typography>
      </Box>

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
          size="small"
          sx={{ flex: 1, minWidth: 200 }}
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

      <TableContainer component={Paper} sx={{ borderRadius: 2,  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1e1e2f", }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Head Office Address</TableCell>
              <TableCell>Contact No</TableCell>
              <TableCell>Registration Date</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentCompanies.map((company) => (
              <TableRow key={company.id}>
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

      {pageCount > 1 && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handleChange}
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
