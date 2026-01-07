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
import { useDrivers  } from "../context/DriverContext"; // ADD THIS IMPORT

const STATUS_IMAGE_MAP = {
  online: "/assets/driver/offline.png",
  offline: "/assets/driver/online.png",
};

const PAGE_SIZE = 4;

const Driver = () => {
  const theme = useTheme();


  
  // NEW WAY: Get from Context API
  const { drivers, deleteDriver } = useDrivers();
  
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("")

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this driver?" 
    );
    if (!confirmed) return;

   
    deleteDriver(id);

    if ((page - 1) * PAGE_SIZE >= drivers.length - 1) {
      setPage((p) => Math.max(p - 1, 1));
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const filteredDrivers= drivers.filter (driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.lastname.toLowerCase().includes(searchTerm.toLowerCase())||
    driver.contact.toLowerCase().includes(searchTerm.toLowerCase())||
    driver.Email.toLowerCase().includes(searchTerm.toLowerCase())||
    driver.license.toLowerCase().includes(searchTerm.toLowerCase())||
    driver.status.toLowerCase().includes(searchTerm.toLowerCase())
    
    
    

  )

  
  const currentDrivers = filteredDrivers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageCount = Math.ceil(filteredDrivers.length / PAGE_SIZE);

  return (
    <Box sx={{ width: "100%" }}>
    
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
          value= {searchTerm}
          onChange={(e)=> setSearchTerm(e.target.value) }
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
          to="/Driver/add"
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
            {currentDrivers.map((driver) => (
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
                  {/* Fixed: Changed to /Driver/edit/ */}
                  <IconButton
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/Driver/edit/${driver.id}`}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(driver.id)}
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

      {/* Driver Display List */}
      <Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          Driver Display
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
                <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                  List
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentDrivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell>{driver.id}</TableCell>
                  <TableCell>{driver.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Driver;