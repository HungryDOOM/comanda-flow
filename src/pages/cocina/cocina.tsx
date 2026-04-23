// Cocina.tsx
import React, { useEffect, useState } from "react";
import { Typography, Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TableCard from "../../components/card/TableCard";
import { getPedidos } from "../../services/api";
import type { Pedido } from "../../services/api";

const Cocina: React.FC = () => {
  const theme = useTheme();

  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    getPedidos().then(setPedidos);
  }, []);


  return (
    <Box sx={{ p: 5, backgroundColor: theme.palette.background.default, top: 64 }}>
      <Typography variant="h4" gutterBottom>
        Órdenes en Cocina
      </Typography>
      <Stack
        direction="row"
        spacing={3}
        flexWrap="wrap"
        justifyContent="flex-start"
      >
        {pedidos.map((pedido) => (
          <TableCard
            key={pedido.mesa}
            mesa={pedido.mesa}
            pedidos={pedido.pedido}
            comanda={pedido.comanda} />
        ))}
      </Stack>
    </Box>
  );
};

export default Cocina;