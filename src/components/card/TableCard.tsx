import { Card, CardContent, Box, Typography } from "@mui/material";
import React from "react";

interface ProductCardProps {
  mesa: number;
  pedidos: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({ mesa, pedidos }) => {
  return (
    <Box sx={{ width: 300 }}>
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h5">Mesa {mesa}</Typography>
          <Typography variant="body2">Pedidos:
            {pedidos.map((pedido, index) => (
              <li key={index}>{pedido}</li>
            ))}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductCard;