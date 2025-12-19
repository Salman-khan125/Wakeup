import React from "react";
import { Box, Button } from "@mui/material";

const ThemeToggle = ({ mode, toggleTheme }) => {
  if (!mode || !toggleTheme) return null;

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        onClick={toggleTheme}
        variant="contained"
        size="small"
        sx={{
          textTransform: "none",
          borderRadius: 2,
          bgcolor: "primary.main",
        }}
      >
        {mode === "light" ? "Dark Mode" : "Light Mode"}
      </Button>
    </Box>
  );
};

export default ThemeToggle;
