import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./theme/theme";
import {BrowserRouter} from "react-router-dom"

const Root = () => {
  const [mode, setMode] = useState("light"); // default light mode

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
   <BrowserRouter>
      <App toggleTheme={toggleTheme} mode={mode} />
     </BrowserRouter>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);

