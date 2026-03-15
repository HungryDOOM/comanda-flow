// Navbar.tsx
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const MainNavbar: React.FC = () => {
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Comanda-Flow
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Inicio
        </Button>
        <Button color="inherit" component={Link} to="/cocina">
          Cocina
        </Button>
        <Button color="inherit" component={Link} to="/caja">
          Caja
        </Button>
        <Button color="inherit" component={Link} to="/mesero">
          Mesero
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavbar;