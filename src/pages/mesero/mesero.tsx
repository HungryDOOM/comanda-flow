import React, { useEffect, useState } from "react";
import ProductCard from "../../components/card/ProductCard";
import { Box, Stack } from "@mui/system";
import NavCategories from "../../components/NavBar/NavCategories";
import { useTheme } from "@mui/material/styles";
import type { Categoria } from "../../components/types/types";
import { Button, Typography } from "@mui/material";
import { getProductos } from "../../services/api";
import type { Producto } from "../../services/api";
import { sendPedido } from "../../services/api";

const Mesero: React.FC = () => {
  const [productos, SetProductos] = useState<Producto[]>([]);
  const [categoria, setCategoria] = useState<Categoria>("Platillos");
  const [cantidades, setCantidades] = useState<Record<number, number>>({});
  const [pedido, setPedido] = useState<string[]>([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState<number>(1);
  const theme = useTheme();

  const actualizarCantidad = (id: number, nuevaCantidad: number) => {
    setCantidades((prev) => ({ ...prev, [id]: nuevaCantidad }));
  };

  const solicitarPedido = () => {
    const seleccionados = productos
    .filter((item) => (cantidades[item.id] || 0) > 0)
    .map((item) => {
      const precio = cantidades[item.id] * item.precio;
      return `${cantidades[item.id]}x ${item.nombre} = ${precio} MXN`;
    });
    setPedido(seleccionados);
    sendPedido(mesaSeleccionada, seleccionados, 150).then((response) => {
      console.log("Pedido enviado:", response);
    });
  };

  useEffect(() => {
    getProductos().then(SetProductos);
  }, []);

  const mesas = [
    { value: 1, label: "Mesa 1" },
    { value: 2, label: "Mesa 2" },
    { value: 3, label: "Mesa 3" },
    { value: 4, label: "Mesa 4" },
    { value: 5, label: "Mesa 5" },
    { value: 6, label: "Mesa 6" },
    { value: 7, label: "Mesa 7" },
    { value: 8, label: "Mesa 8" },
    { value: 9, label: "Mesa 9" },
    { value: 10, label: "Mesa 10" },
  ];

  return (
    <Box sx={{ p: 5, backgroundColor: theme.palette.background.default, top: 64, width: "90vw"}}>
      <Stack spacing={2} alignItems={"center"} direction="column">
        <select value={mesaSeleccionada} onChange={(e) => setMesaSeleccionada(Number(e.target.value))}>
          {mesas.map((mesa) => (
            <option key={mesa.value} value={mesa.value}>
              {mesa.label}
            </option>
          ))}
        </select>
        <Button variant="contained" color="primary" sx={{ width: "10vw" }} onClick={solicitarPedido}>Solicitar pedido</Button>
      </Stack>
      <NavCategories setCategoria={setCategoria} />
      <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent={"space-around"} padding={2}>
        {productos
        .filter((item) => item.tipo === categoria)
        .map((item: any) => (
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