import { Card, CardContent, CardActions, Box, Typography, Button } from "@mui/material";
import React from "react";

interface ProductCardProps {
  nombre: string;
  precio: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ nombre, precio }) => {
  return (
    <Box sx={{ width: 300 }}>
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h5">{nombre}</Typography>
          <Typography variant="body2">Precio: ${precio}</Typography>
          
        </CardContent>
        <CardActions>
          <Button variant="contained" color="success" fullWidth>Agregar</Button>
          <Button variant="contained" color="secondary" fullWidth>Eliminar</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProductCard;