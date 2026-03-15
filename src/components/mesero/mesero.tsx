import React, { useState } from "react";
import ProductCard from "../card/ProductCard";
import { Box, Stack } from "@mui/system";
import NavCategories from "../NavBar/NavCategories";
import { useTheme } from "@mui/material/styles";
import type { Categoria } from "../types/types";

const Mesero: React.FC = () => {
  const [categoria, setCategoria] = useState<Categoria>("platillos");
  const opciones = {
    platillos: [
      { id: 1, nombre: "Tacos al Pastor", precio: 50 },
      { id: 2, nombre: "Hamburguesa", precio: 80 },
      { id: 3, nombre: "Ensalada César", precio: 60 },
    ],
    bebidas: [
      { id: 1, nombre: "Agua de Horchata", precio: 20 },
      { id: 2, nombre: "Refresco", precio: 25 },
      { id: 3, nombre: "Cerveza", precio: 60 },
    ],
    botanas: [
      { id: 1, nombre: "Papas Fritas", precio: 30 },
      { id: 2, nombre: "Nachos", precio: 45 },
      { id: 3, nombre: "Alitas", precio: 80 },
    ],
  };


  const theme = useTheme();
  return (
    <Box sx={{ p: 5, backgroundColor: theme.palette.background.default, top: 64 }}>
      <NavCategories setCategoria={setCategoria} />
      <Stack direction="row" spacing={3} flexWrap="wrap">
        {opciones[categoria].map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </Stack>
    </Box>
  );
};

export default Mesero;