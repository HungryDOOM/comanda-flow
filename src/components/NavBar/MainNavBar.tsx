import React from "react";
import { AppBar, Toolbar, Typography, Button, Badge, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useOrders } from "../../context/OrderContext";

const MainNavbar: React.FC = () => {
  const location = useLocation();
  const { pedidos } = useOrders();
  const nuevas = pedidos.filter((p) => p.status === "nuevo").length;
  const listas = pedidos.filter((p) => p.status === "listo").length;

  const navItems = [
    { label: "Inicio", path: "/", icon: null, badge: 0 },
    { label: "Mesero", path: "/mesero", icon: null, badge: 0 },
    { label: "Cocina", path: "/cocina", icon: null, badge: nuevas },
    { label: "Caja", path: "/caja", icon: null, badge: listas },
  ];

  return (
    <AppBar position="fixed" color="primary" elevation={3}>
      <Toolbar>
        <Typography variant="h6" fontWeight={800} sx={{ flexGrow: 1, letterSpacing: 1 }}>
          ComandaFlow
        </Typography>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              component={Link}
              to={item.path}
              startIcon={
                item.badge > 0 ? (
                  <Badge badgeContent={item.badge} color="error">{item.icon}</Badge>
                ) : item.icon
              }
              sx={{
                fontWeight: location.pathname === item.path ? 800 : 400,
                borderBottom: location.pathname === item.path ? "3px solid white" : "none",
                borderRadius: 0,
                pb: 0.5,
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavbar;
