import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { getTheme } from "./theme/Theme";
import { CompanyProvider } from "./context/CompanyContext";
import { CountryProvider } from "./context/CountryContext";
import { BusProvider } from "./context/BusContext";
import { DriverProvider } from "./context/DriverContext";
import { LineProvider } from "./context/LineContext";
import { StopProvider } from "./context/StopContext";
import {UsersProvider} from "./context/UsersContext";

const Root = () => {
  const [mode, setMode] = useState("light"); // default light mode

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <BrowserRouter>
        <CompanyProvider>
          <CountryProvider>
            <BusProvider>
              <DriverProvider>
                <LineProvider>
                  <StopProvider>
                    <UsersProvider>
                <App toggleTheme={toggleTheme} mode={mode} />
                     </UsersProvider>
                </StopProvider>
                 </LineProvider>
              </DriverProvider>
            </BusProvider>
          </CountryProvider>
        </CompanyProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
