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

// Fixed: Changed to camelCase for consistency
const allLines = [
  { id: 1, name: "Alley", Email: "Alleyjhon@gmail.com", Role: "Region" },
  { id: 2, name: "Alley", Email: "Alleyjhon@gmail.com", Role: "Region" },
  { id: 3, name: "alley", Email: "Alleyjhon@gmail.com", Role: "Region" },
  { id: 4, name: "Alley", Email: "Alleyjhon@gmail.com", Role: "Region" },
  { id: 5, name: "Alley", Email: "Alleyjhon@gmail.com", Role: "Region" },
  { id: 6, name: "Alley", Email: "Alleyjhon@gmail.com", Role: "Region" },
  { id: 7, name: "Alley", Email: "Alleyjhon@gmail.com", Role: "Region" },
];

const PAGE_SIZE = 4;

const Line = () => {
  const theme = useTheme();
  
  // Fixed: Use camelCase for state variable to avoid conflicts
  const [lines, setLines] = useState(allLines);
  const [page, setPage] = useState(1);

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this line?" // Fixed: Changed "company" to "line"
    );
    if (!confirmed) return;

    setLines((prev) => prev.filter((l) => l.id !== id));

    if ((page - 1) * PAGE_SIZE >= lines.length - 1) {
      setPage((p) => Math.max(p - 1, 1));
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Fixed: Use state variable 'lines' instead of 'alllines'
  const currentLines = lines.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageCount = Math.ceil(lines.length / PAGE_SIZE);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="600">
          Line
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
          sx={{ flex: 1, minWidth: 200 }}
        />
        <Button 
          variant="contained" 
          sx={{ height: 40, borderRadius: 3 }}
          component={Link}
          to="/Line/add"
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
                Line Name
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Email Address
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Role
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Fixed: Changed variable name from 'Line' to 'line' (lowercase) */}
            {currentLines.map((line) => (
              <TableRow
                key={line.id}
                sx={{
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "light" ? "#f5f5f5" : "#2c2c3e",
                  },
                }}
              >
                <TableCell>{line.id}</TableCell>
                <TableCell>{line.name}</TableCell>
                <TableCell>{line.Email}</TableCell>
                <TableCell>{line.Role}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/Line/edit/${line.id}`} // Fixed: Changed to lowercase 'line'
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(line.id)} // Fixed: Changed to lowercase 'line'
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

      {/* Line Display List */}
      <Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          Line Display
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
              {/* Fixed: Changed variable name from 'Line' to 'line' (lowercase) */}
              {currentLines.map((line) => (
                <TableRow key={line.id}>
                  <TableCell>{line.id}</TableCell>
                  <TableCell>{line.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Line;