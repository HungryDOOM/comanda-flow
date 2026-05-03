import React, { useState } from "react";
import {
  Typography, Box, Stack, Button, Chip, CircularProgress,
  Card, CardContent, CardActions, Alert, Snackbar, Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useOrders } from "../../context/OrderContext";
import type { OrderStatus } from "../../components/types/types";

const statusConfig: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  nuevo: { label: "Nuevo", color: "#F57C00", bg: "#FFF3E0" },
  preparando: { label: "Preparando", color: "#1565C0", bg: "#E3F2FD" },
  listo: { label: "Listo", color: "#2E7D32", bg: "#E8F5E9" },
  pagado: { label: "Pagado", color: "#616161", bg: "#F5F5F5" },
};

const Cocina: React.FC = () => {
  const theme = useTheme();
  const { pedidos, refreshPedidos, updateStatus, loading, lastUpdated } = useOrders();
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const pedidosActivos = pedidos.filter((p) => p.status !== "pagado");
  const nuevos = pedidosActivos.filter((p) => p.status === "nuevo");
  const preparando = pedidosActivos.filter((p) => p.status === "preparando");
  const listos = pedidosActivos.filter((p) => p.status === "listo");

  const handleMarcarPreparando = (comanda: string) => {
    updateStatus(comanda, "preparando");
    setSnackbar({ open: true, message: "Orden en preparación" });
  };

  const handleMarcarListo = (comanda: string, mesa: number) => {
    updateStatus(comanda, "listo");
    setSnackbar({ open: true, message: `Mesa ${mesa} lista para servir` });
  };

  const renderCard = (pedido: (typeof pedidosActivos)[0]) => {
    const cfg = statusConfig[pedido.status];
    let pedidosArray: string[] = [];
    try { pedidosArray = JSON.parse(pedido.pedido); } catch { pedidosArray = [pedido.pedido]; }

    return (
      <Card
        key={pedido.comanda}
        elevation={3}
        sx={{ width: 280, borderLeft: `6px solid ${cfg.color}`, backgroundColor: cfg.bg, transition: "all 0.2s" }}
      >
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>{pedido.comanda}</Typography>
            <Chip label={cfg.label} size="small" sx={{ bgcolor: cfg.color, color: "white", fontWeight: 700 }} />
          </Stack>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>Mesa {pedido.mesa}</Typography>
          <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>Pedidos:</Typography>
          <Box component="ul" sx={{ m: 0, pl: 2 }}>
            {pedidosArray.map((item, i) => (
              <Typography key={i} component="li" variant="body2" sx={{ mb: 0.3 }}>{item}</Typography>
            ))}
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
            Total: ${pedido.precio_total?.toFixed(2)} MXN
          </Typography>
        </CardContent>
        <CardActions sx={{ px: 2, pb: 2 }}>
          {pedido.status === "nuevo" && (
            <Button fullWidth variant="contained" color="warning"
              onClick={() => handleMarcarPreparando(pedido.comanda)}>
              Preparar
            </Button>
          )}
          {pedido.status === "preparando" && (
            <Button fullWidth variant="contained" color="success"
              onClick={() => handleMarcarListo(pedido.comanda, pedido.mesa)}>
              Marcar Listo
            </Button>
          )}
          {pedido.status === "listo" && (
            <Chip label="Esperando cobro en Caja" color="success" variant="outlined" sx={{ width: "100%" }} />
          )}
        </CardActions>
      </Card>
    );
  };

  const Section: React.FC<{ title: string; icon: React.ReactNode; items: typeof pedidosActivos; color: string }> = ({ title, icon, items, color }) => (
    <Box sx={{ mb: 4 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <Box sx={{ color }}>{icon}</Box>
        <Typography variant="h6" fontWeight={700} color={color}>{title}</Typography>
        <Chip label={items.length} size="small" sx={{ bgcolor: color, color: "white", fontWeight: 700 }} />
      </Stack>
      {items.length === 0 ? (
        <Typography color="text.secondary" sx={{ ml: 1 }}>Sin órdenes en esta etapa</Typography>
      ) : (
        <Stack direction="row" flexWrap="wrap" gap={2}>{items.map(renderCard)}</Stack>
      )}
    </Box>
  );

  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.background.default, minHeight: "100vh" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          {lastUpdated && (
            <Typography variant="caption" color="text.secondary">
              Actualizado: {lastUpdated.toLocaleTimeString()}
            </Typography>
          )}
          <Tooltip title="Actualizar órdenes">
            <Button variant="outlined" startIcon={loading ? <CircularProgress size={18} /> : null}
              onClick={refreshPedidos} disabled={loading}>
              Actualizar
            </Button>
          </Tooltip>
        </Stack>
      </Stack>

      {pedidosActivos.length === 0 && !loading && (
        <Alert severity="info" sx={{ mb: 3 }}>No hay órdenes activas en este momento.</Alert>
      )}

      <Section title="Nuevas Órdenes" icon={null} items={nuevos} color="#F57C00" />
      <Section title="En Preparación" icon={null} items={preparando} color="#1565C0" />
      <Section title="Listos para Servir" icon={null} items={listos} color="#2E7D32" />

      <Snackbar open={snackbar.open} autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity="success" variant="filled" onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Cocina;
