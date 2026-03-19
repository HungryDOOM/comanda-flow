import React, { useState } from "react";
import ProductCard from "../../components/card/ProductCard";
import { Box, Stack } from "@mui/system";
import NavCategories from "../../components/NavBar/NavCategories";
import { useTheme } from "@mui/material/styles";
import type { Categoria } from "../../components/types/types";
import { Button, Typography } from "@mui/material";

const Mesero: React.FC = () => {
  const [categoria, setCategoria] = useState<Categoria>("platillos");
  const [cantidades, setCantidades] = useState<Record<number, number>>({});

  const actualizarCantidad = (id: number, nuevaCantidad: number) => {
    setCantidades((prev) => ({ ...prev, [id]: nuevaCantidad }));
  };

  const opciones = {
    platillos: [
      { id: 1, nombre: "Tacos al Pastor", precio: 50 },
      { id: 2, nombre: "Hamburguesa", precio: 80 },
      { id: 3, nombre: "Ensalada César", precio: 60 },
      { id: 4, nombre: "Sopa de Tortilla", precio: 40 },
      { id: 5, nombre: "Pizza Pepperoni", precio: 90 },
      { id: 6, nombre: "Pasta Alfredo", precio: 70 },
      { id: 7, nombre: "Pollo a la Parrilla", precio: 85 },
      { id: 8, nombre: "Filete de Res", precio: 120 },
      { id: 9, nombre: "Camarones al Ajillo", precio: 110 },
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

  const [pedido, setPedido] = useState<string[]>([]);

  const solicitarPedido = () => {
    const seleccionados = opciones[categoria]
    .filter((item) => (cantidades[item.id] || 0) > 0)
    .map((item) => `${cantidades[item.id]}x ${item.nombre}`);
    setPedido(seleccionados);
  };

  const theme = useTheme();
  return (
    <Box sx={{ p: 5, backgroundColor: theme.palette.background.default, top: 64, width: "90vw" }}>
      <Button variant="contained" color="success" fullWidth onClick={solicitarPedido}>Solicitar pedido</Button>
      <NavCategories setCategoria={setCategoria} />
      <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent={"space-around"}>
        {opciones[categoria].map((item) => (
          <ProductCard
            key={item.id}
            nombre={item.nombre}
            precio={item.precio}
            cantidad={cantidades[item.id] || 0}
            setCantidad={(nuevaCantidad) => actualizarCantidad(item.id, nuevaCantidad)}
          />
        ))}
      </Stack>
      {pedido.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Pedido actual:</Typography>
          <ul>
            {pedido.map((linea, index) => (
              <li key={index}>{linea}</li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
};

export default Mesero;