// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import Cocina from "./components/cocina/cocina";
import Mesero from "./components/mesero/mesero";
import { useTheme } from "@mui/material/styles";
import MainNavbar from "./components/NavBar/MainNavBar";

const Home: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minWidth: "100vw",        // ocupa todo el ancho
        display: "flex",          // activa flexbox
        flexDirection: "column",  // apila título y botones
        justifyContent: "center", // centra vertical
        alignItems: "center",     // centra horizontal
        gap: 4,                   // espacio entre elementos
        backgroundColor: theme.palette.background.default,
        position: "fixed",
      }}
    >
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <MainNavbar />
      <Box sx={{ top: 64, position: "fixed" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cocina" element={<Cocina />} />
          <Route path="/caja" element={<Typography variant="h4" align="center" mt={8}>Vista de Caja</Typography>} />
          <Route path="/mesero" element={<Mesero />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;