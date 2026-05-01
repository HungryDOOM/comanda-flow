import { Card, CardContent, Box, Typography } from "@mui/material";
import React from "react";

interface ProductCardProps {
  mesa: number;
  pedidos: string;
  comanda: string;
}

const TableCard: React.FC<ProductCardProps> = ({ mesa, pedidos, comanda }) => {
  const pedidosArray: string[] = JSON.parse(pedidos);
  return (
    <Box sx={{ width: 300 }}>
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h5">{comanda}</Typography>
          <Typography variant="h6">Mesa {mesa}</Typography>
          <Typography variant="body2">Pedidos:</Typography>
          <ul style={{ listStyleType: "none" }} >
            {pedidosArray.map((pedido, index) => (
              <li key={index}>{pedido}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TableCard;