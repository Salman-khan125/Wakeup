import { createTheme } from "@mui/material/styles";

// Common settings for both light and dark
const commonSettings = {
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
};

export const getTheme = (mode) =>
  createTheme({
    ...commonSettings,
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: { main: "#2962ff" },
            background: {
              default: "#f4f6f8",
              paper: "#ecf6ffff",
            },
            text: { primary: "#1a1a1a", secondary: "#555555" },
          }
        : {
            primary: { main: "#2962ff" },
            background: {
              default: "#0d1b2a", // deep blue instead of black
              paper: "#1a2a40",   // sidebar paper slightly lighter blue
            },
            text: { primary: "#e0e0e0", secondary: "#a0a0a0" },
          }),
    },
  });
