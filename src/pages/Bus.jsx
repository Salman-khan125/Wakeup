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
import { useBuses } from "../context/BusContext"; // ADD THIS IMPORT

const STATUS_IMAGE_MAP = {
 active: "/assets/bus/Active.png",
 maintenance: "/assets/bus/maintenance.png",
 outofservice: "/assets/bus/Outofservice.png",
};

const STATUS_DIMENSIONS = {
 active: { width: "auto", height: 40 },
 maintenance: { width: "auto", height: 40 },
 outofservice: { width: "auto", height: 40 },
};

const PAGE_SIZE = 4;

const Bus = () => {
  const theme = useTheme();
  
  // OLD WAY (remove this):
  // const [buses, setBuses] = useState(allBuses);
  
  // NEW WAY: Get from Context API
  const { buses, deleteBus } = useBuses();
  
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this bus?"
    );
    if (!confirmed) return;

    // OLD WAY: setBuses((prev) => prev.filter((b) => b.id !== id));
    // NEW WAY: Use context function
    deleteBus(id);

    if ((page - 1) * PAGE_SIZE >= buses.length - 1) {
      setPage((p) => Math.max(p - 1, 1));
    }
  };

  // Use buses from context
  const currentBuses = buses.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageCount = Math.ceil(buses.length / PAGE_SIZE);

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
        <Button
          component={Link}
          to="/Bus/add"
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
                Vehicle Number
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                No of Seat
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Bus Model
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Bus Status
              </TableCell>
               <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Company
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentBuses.map((bus) => (
              <TableRow
                key={bus.id_bus}
                sx={{
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "light" ? "#f5f5f5" : "#2c2c3e",
                  },
                }}
              >
                <TableCell>{bus.id_bus}</TableCell>
                <TableCell>{bus.plate_number}</TableCell>
                <TableCell>{bus.capacity}</TableCell>
                <TableCell>{bus.model}</TableCell>
               
                
                
                <TableCell>
               {STATUS_IMAGE_MAP[bus.status?.toLowerCase().replace(/\s/g, "")] ? (
    <Box
      component="img"
      src={STATUS_IMAGE_MAP[bus.status.toLowerCase().replace(/\s/g, "")]}
      alt={bus.status}
      sx={{
        width:
          STATUS_DIMENSIONS[bus.status.toLowerCase().replace(/\s/g, "")]
            ?.width || "auto",
        height:
          STATUS_DIMENSIONS[bus.status.toLowerCase().replace(/\s/g, "")]
            ?.height || 40,
        objectFit: "contain",
      }}
    />
  ) : (
  <Typography variant="body2" color="textSecondary">
    No status
  </Typography>
)}




                </TableCell>
                 <TableCell> {bus.id_company} </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/Bus/edit/${bus.id_bus}`}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(bus.id_bus)}
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

      {/* Bus Display List */}
      <Box>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          Bus Display
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
              {currentBuses.map((bus) => (
                <TableRow key={bus.id_bus}>
                  <TableCell>{bus.id_bus}</TableCell>
                  <TableCell>{bus.plate_number}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Bus;