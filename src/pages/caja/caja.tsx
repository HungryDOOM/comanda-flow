// Caja.tsx
import React from "react";
import { Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Caja: React.FC = () => {
  const theme = useTheme();
  return (
    <Box sx={{ p: 5, backgroundColor: theme.palette.background.default, top: 64 }}>
      <Typography variant="h4" gutterBottom>
        Órdenes en Caja
      </Typography>
    </Box>
  );
};

export default Caja;