import { Card, CardContent, CardActions, Box, Typography, Button, CardMedia } from "@mui/material";
import React from "react";

interface ProductCardProps {
  nombre: string;
  precio: number;
  cantidad: number;
  setCantidad: (n: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ nombre, precio, cantidad, setCantidad }) => {
  return (
    <Box sx={{ width: 300 }}>
      <Card elevation={4}>
        <CardContent>
          <CardMedia
            component="img"
            height="256"
            image={`/menu/${nombre}.jpg`}
            alt={nombre}
          />
          <Typography variant="h5">{nombre}</Typography>
          <Typography variant="body2">Precio: {precio}</Typography>
          <Typography variant="body2">Cantidad: {cantidad}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="success" fullWidth onClick={() => setCantidad(cantidad + 1)}>Agregar</Button>
          <Button variant="contained" color="secondary" fullWidth onClick={() => setCantidad(Math.max(0, cantidad - 1))}>Eliminar</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProductCard;