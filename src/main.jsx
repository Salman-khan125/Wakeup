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
import { TripProvider } from "./context/TripContext";
import { BusTripProvider } from "./context/BusTripContext";
import { GeolocationProvider } from "./context/GeolocationContext";
import { AlertProvider } from "./context/AlertContext";

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
                      <TripProvider>
                        <BusTripProvider>
                          <GeolocationProvider>
                            <AlertProvider>
                <App toggleTheme={toggleTheme} mode={mode} />
                            </AlertProvider>
                           </GeolocationProvider>

                         </BusTripProvider>
                       </TripProvider>
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
