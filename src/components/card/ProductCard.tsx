import { Card, CardContent, CardActions, Box, Typography, Button, CardMedia, Stack } from "@mui/material";
import React from "react";

interface ProductCardProps {
  nombre: string;
  precio: number;
  cantidad: number;
  setCantidad: (n: number) => void;
  img_url: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ nombre, precio, cantidad, setCantidad, img_url }) => {
  return (
    <Box sx={{ width: 220 }}>
      <Card elevation={3} sx={{
        height: "100%", display: "flex", flexDirection: "column",
        border: cantidad > 0 ? "2px solid #2E7D32" : "2px solid transparent",
        transition: "border 0.2s, transform 0.15s",
        "&:hover": { transform: "translateY(-3px)", boxShadow: 6 },
      }}>
        <CardMedia component="img" height="160" src={img_url} alt={nombre}
          sx={{ objectFit: "cover" }} onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/220x160?text=Sin+imagen"; }} />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="subtitle1" fontWeight={700}>{nombre}</Typography>
          <Typography variant="body2" color="text.secondary">${precio.toFixed(2)} MXN</Typography>
          {cantidad > 0 && (
            <Typography variant="caption" color="success.main" fontWeight={600}>
              Subtotal: ${(cantidad * precio).toFixed(2)} MXN
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{ px: 1.5, pb: 1.5 }}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" width="100%">
            <Button variant="outlined" color="secondary" size="small"
              onClick={() => setCantidad(Math.max(0, cantidad - 1))} disabled={cantidad === 0}
              sx={{ minWidth: 36, px: 0 }}>
            </Button>
            <Typography fontWeight={700} sx={{ minWidth: 24, textAlign: "center" }}>{cantidad}</Typography>
            <Button variant="contained" color="primary" size="small"
              onClick={() => setCantidad(cantidad + 1)} sx={{ minWidth: 36, px: 0 }}>
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ProductCard;
