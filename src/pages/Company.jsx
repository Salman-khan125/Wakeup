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
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useCompanies } from "../context/CompanyContext";
import { useCountries } from "../context/CountryContext";

const STATUS_IMAGE_MAP = {
  Logo1: "/assets/company/1.png",
  Logo2: "/assets/company/2.png",
  Logo3: "/assets/company/3.png",
  Logo4: "/assets/company/4.png",
  Logo5: "/assets/company/5.png",
  Logo6: "/assets/company/6.png",
};

const PAGE_SIZE = 4;

const Company = () => {
  const theme = useTheme();
  const { companies, deleteCompany } = useCompanies();
  const { countries } = useCountries();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this company?"
    );
    if (!confirmed) return;

    deleteCompany(id);

    if ((page - 1) * PAGE_SIZE >= companies.length - 1) {
      setPage((p) => Math.max(p - 1, 1));
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const filteredCompanies = companies.filter((company) =>
    company.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.company_logo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.transport_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.activity_domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.created_at.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(company.id_country).toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.Email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentCompanies = filteredCompanies.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const pageCount = Math.ceil(filteredCompanies.length / PAGE_SIZE);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mt: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h5" fontWeight="600">
            Welcome Back
          </Typography>
          <Box
            component="img"
            src="/assets/country/hand.png"
            alt="welcome icon"
            sx={{ width: 37, height: 37, objectFit: "contain" }}
          />
        </Box>

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

      {/* Title + Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          mt: 2,
        }}
      >
        <Typography variant="h6" fontWeight="600">
          Country
        </Typography>

        <Button
          component={Link}
          to="/Company/add"
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
          Add Company
        </Button>
      </Box>

      {/* Main Table */}
      <TableContainer
        component={Paper}
        sx={{
          mb: 2,
          borderRadius: 2,
          overflowX: "auto",
          backgroundColor:
            theme.palette.mode === "light" ? "#fff" : "#1e1e2f",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>#</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Company Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Company Logo</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Transport Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>
                Head Office Address
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>phone No</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Country</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email Address</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {currentCompanies.map((company) => {
              const country = countries.find(
                (c) => c.id === Number(company.id_country)
              );

              return (
                <TableRow key={company.id_company}>
                  <TableCell>{company.id_company}</TableCell>
                  <TableCell>{company.company_name}</TableCell>

                  <TableCell>
                    <Box
                      component="img"
                      src={STATUS_IMAGE_MAP[company.company_logo]}
                      alt={company.company_logo}
                      sx={{ width: 48, height: 48, objectFit: "contain" }}
                    />
                  </TableCell>

                  <TableCell>{company.transport_type}</TableCell>
                  <TableCell>{company.address}</TableCell>
                  <TableCell>{company.phone}</TableCell>

                  {/* ✅ UPDATED COUNTRY COLUMN */}
                  <TableCell>
                    {country && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Box
                          component="img"
                          src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                          alt={country.name}
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                        <Typography variant="body2">
                          {country.name}
                        </Typography>
                      </Box>
                    )}
                  </TableCell>

                  <TableCell>{company.Email}</TableCell>

                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      component={Link}
                      to={`/Company/edit/${company.id_company}`}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() =>
                        handleDelete(company.id_company)
                      }
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
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
    </Box>
  );
};

export default Company;
