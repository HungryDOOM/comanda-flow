import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, ThemeProvider, CssBaseline } from "@mui/material";
import { OrderProvider } from "./context/OrderContext";
import theme from "./components/themes/themes";
import MainNavbar from "./components/NavBar/MainNavBar";
import Home from "./pages/home/Home";
import Cocina from "./pages/cocina/cocina";
import Mesero from "./pages/mesero/mesero";
import Caja from "./pages/caja/caja";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OrderProvider>
        <Router>
          <MainNavbar />
          <Box sx={{ pt: "64px", minHeight: "100vh" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cocina" element={<Cocina />} />
              <Route path="/caja" element={<Caja />} />
              <Route path="/mesero" element={<Mesero />} />
            </Routes>
          </Box>
        </Router>
      </OrderProvider>
    </ThemeProvider>
  );
};

export default App;
