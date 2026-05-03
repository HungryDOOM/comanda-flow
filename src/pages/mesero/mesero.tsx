import React, { useEffect, useState } from "react";
import {
  Box, Stack, Button, Typography, Drawer, Divider,
  Select, MenuItem, FormControl, InputLabel, Badge,
  IconButton, Alert, Snackbar, CircularProgress,
  Paper, Chip,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ProductCard from "../../components/card/ProductCard";
import NavCategories from "../../components/NavBar/NavCategories";
import { useTheme } from "@mui/material/styles";
import type { Categoria } from "../../components/types/types";
import { getProductos, sendPedido } from "../../services/api";
import type { Producto } from "../../services/api";
import { useOrders } from "../../context/OrderContext";

const TOTAL_MESAS = 10;

const Mesero: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categoria, setCategoria] = useState<Categoria>("Platillos");
  const [cantidades, setCantidades] = useState<Record<number, number>>({});
  const [mesaSeleccionada, setMesaSeleccionada] = useState<number>(1);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingProductos, setLoadingProductos] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
  const theme = useTheme();
  const { refreshPedidos, pedidos } = useOrders();

  const mesasOcupadas = new Set(
    pedidos
      .filter((p) => p.estado !== "pagado")
      .map((p) => p.mesa)
  );
  const actualizarCantidad = (id: number, nuevaCantidad: number) => {
    setCantidades((prev) => ({ ...prev, [id]: Math.max(0, nuevaCantidad) }));
  };

  const itemsEnCarrito = productos.filter((p) => (cantidades[p.id] || 0) > 0);
  const totalItems = itemsEnCarrito.reduce((sum, p) => sum + (cantidades[p.id] || 0), 0);
  const precioTotal = itemsEnCarrito.reduce((sum, p) => sum + (cantidades[p.id] || 0) * p.precio, 0);

  const limpiarCarrito = () => {
    setCantidades({});
    setCartOpen(false);
  };

  const solicitarPedido = async () => {
    if (itemsEnCarrito.length === 0) {
      setSnackbar({ open: true, message: "El carrito está vacío", severity: "error" });
      return;
    }
    setLoading(true);
    try {
      const lineas = itemsEnCarrito.map((item) => {
        const subtotal = cantidades[item.id] * item.precio;
        return `${cantidades[item.id]}x ${item.nombre} = $${subtotal.toFixed(2)} MXN`;
      });
      const now = new Date();
      const date = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,"0")}${String(now.getDate()).padStart(2,"0")}`;
      const time = `${String(now.getHours()).padStart(2,"0")}${String(now.getMinutes()).padStart(2,"0")}${String(now.getSeconds()).padStart(2,"0")}`;
      const comanda = `COM-${date}-${time}`;
      await sendPedido(mesaSeleccionada, lineas, precioTotal, comanda, "nuevo");
      await refreshPedidos();
      limpiarCarrito();
      setSnackbar({ open: true, message: `Pedido enviado para Mesa ${mesaSeleccionada}`, severity: "success" });
    } catch {
      setSnackbar({ open: true, message: "Error al enviar el pedido. Intenta de nuevo.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoadingProductos(true);
    getProductos()
      .then(setProductos)
      .catch(() => setSnackbar({ open: true, message: "Error al cargar productos", severity: "error" }))
      .finally(() => setLoadingProductos(false));
  }, []);

  useEffect(() => {
    if (mesasOcupadas.has(mesaSeleccionada)) {
      const libreIndex = Array.from({ length: TOTAL_MESAS }, (_, i) => i + 1)
        .find((m) => !mesasOcupadas.has(m));
      if (libreIndex) setMesaSeleccionada(libreIndex);
    }
  }, [pedidos]);

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: "100vh", pb: 4 }}>
      <Box sx={{ px: 3, pt: 2, pb: 1 }} width="70vw">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" gap={1}>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Mesa</InputLabel>
              <Select
                value={mesaSeleccionada}
                label="Mesa"
                onChange={(e) => setMesaSeleccionada(Number(e.target.value))}
              >
                {Array.from({ length: TOTAL_MESAS }, (_, i) => i + 1).map((m) => {
                  const ocupada = mesasOcupadas.has(m);
                  return (
                    <MenuItem key={m} value={m} disabled={ocupada}>
                      Mesa {m} {ocupada ? "Ocupada" : "Libre"}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {precioTotal > 0 && (
              <Chip label={`Total: $${precioTotal.toFixed(2)} MXN`} color="primary" variant="filled" sx={{ fontWeight: 700, fontSize: "0.9rem" }} />
            )}
          </Stack>
          <Stack direction="row" spacing={1} right={0}>
            <Button variant="outlined" color="secondary" startIcon={<DeleteIcon />} onClick={limpiarCarrito} disabled={totalItems === 0}>Limpiar</Button>
            <IconButton color="primary" onClick={() => setCartOpen(true)}>
              <Badge badgeContent={totalItems} color="error"><ShoppingCartIcon /></Badge>
            </IconButton>
            <Button
              variant="contained" color="primary"
              startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SendIcon />}
              onClick={solicitarPedido} disabled={totalItems === 0 || loading}
            >Enviar Pedido</Button>
          </Stack>
        </Stack>
      </Box>

      <NavCategories setCategoria={setCategoria} categoriaActiva={categoria} />

      <Box sx={{ pr: "12vw", pl: 2 }}>
        {loadingProductos ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}><CircularProgress /></Box>
        ) : (
          <Stack direction="row" flexWrap="wrap" gap={2} sx={{ pt: 2 }}>
            {productos.filter((item) => item.tipo === categoria).map((item) => (
              <ProductCard key={item.id} nombre={item.nombre} precio={item.precio}
                cantidad={cantidades[item.id] || 0} setCantidad={(n) => actualizarCantidad(item.id, n)} img_url={item.img_url} />
            ))}
          </Stack>
        )}
      </Box>

      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Box sx={{ width: 340, p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>🛒 Carrito — Mesa {mesaSeleccionada}</Typography>
          <Divider sx={{ mb: 2 }} />
          {itemsEnCarrito.length === 0 ? (
            <Typography color="text.secondary" sx={{ mt: 4, textAlign: "center" }}>El carrito está vacío</Typography>
          ) : (
            <Box sx={{ flex: 1, overflowY: "auto" }}>
              {itemsEnCarrito.map((item) => (
                <Paper key={item.id} elevation={1} sx={{ p: 1.5, mb: 1.5, borderRadius: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography fontWeight={600}>{item.nombre}</Typography>
                      <Typography variant="body2" color="text.secondary">${item.precio.toFixed(2)} × {cantidades[item.id]}</Typography>
                    </Box>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <IconButton size="small" onClick={() => actualizarCantidad(item.id, (cantidades[item.id]||0)-1)} sx={{ minWidth: 30, px: 0 }}><RemoveIcon /></IconButton>
                      <Typography sx={{ mx: 0.5 }}>{cantidades[item.id]}</Typography>
                      <IconButton size="small" onClick={() => actualizarCantidad(item.id, (cantidades[item.id]||0)+1)} sx={{ minWidth: 30, px: 0 }}><AddIcon /></IconButton>
                      <IconButton size="small" color="error" onClick={() => actualizarCantidad(item.id, 0)}><DeleteIcon fontSize="small" /></IconButton>
                    </Stack>
                  </Stack>
                  <Typography variant="body2" fontWeight={600} sx={{ mt: 0.5, textAlign: "right" }}>
                    Subtotal: ${(cantidades[item.id] * item.precio).toFixed(2)} MXN
                  </Typography>
                </Paper>
              ))}
            </Box>
          )}
          <Divider sx={{ mt: 2, mb: 2 }} />
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Total: ${precioTotal.toFixed(2)} MXN</Typography>
          <Stack spacing={1}>
            <Button variant="contained" color="primary" fullWidth
              startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SendIcon />}
              onClick={solicitarPedido} disabled={totalItems === 0 || loading} size="large">Confirmar Pedido</Button>
            <Button variant="outlined" color="secondary" fullWidth onClick={limpiarCarrito}>Limpiar carrito</Button>
          </Stack>
        </Box>
      </Drawer>

      <Snackbar open={snackbar.open} autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity={snackbar.severity} variant="filled" onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Mesero;
