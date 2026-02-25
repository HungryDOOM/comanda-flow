// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button, Typography, Stack, Box } from "@mui/material";
import Cocina from "./components/cocina/cocina";
import { useTheme } from "@mui/material/styles";

const Home: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: "100vh",       // ocupa toda la pantalla
        minWidth: "100vw",        // ocupa todo el ancho
        display: "flex",          // activa flexbox
        flexDirection: "column",  // apila título y botones
        justifyContent: "center", // centra vertical
        alignItems: "center",     // centra horizontal
        gap: 4,                   // espacio entre elementos
        backgroundColor: theme.palette.background.paper
      }}
    >
      <Typography variant="h3" gutterBottom>
        Comanda-Flow
      </Typography>
      <Stack direction="column" spacing={4}>
        <Button component={Link} to="/cocina" variant="contained" color="primary">
          Cocina
        </Button>
        <Button component={Link} to="/caja" variant="contained" color="secondary">
          Caja
        </Button>
        <Button component={Link} to="/mesero" variant="contained" color="success">
          Mesero
        </Button>
      </Stack>
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cocina" element={<Cocina />} />
        <Route path="/caja" element={<Typography variant="h4" align="center" mt={8}>Vista de Caja</Typography>} />
        <Route path="/mesero" element={<Typography variant="h4" align="center" mt={8}>Vista de Mesero</Typography>} />
      </Routes>
    </Router>
  );
};

export default App;