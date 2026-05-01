import React, { useState } from "react";
import {
  Typography, Box, Stack, Button, Chip, Divider,
  Card, CardContent, CardActions, Alert, Snackbar,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Table, TableBody, TableCell, TableHead, TableRow, Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useOrders } from "../../context/OrderContext";

const Caja: React.FC = () => {
  const theme = useTheme();
  const { pedidos, updateStatus, refreshPedidos } = useOrders();
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [ticketDialog, setTicketDialog] = useState<{ open: boolean; comanda: string; mesa: number; items: string[]; total: number } | null>(null);

  const pedidosListos = pedidos.filter((p) => p.status === "listo");
  const pedidosEnCurso = pedidos.filter((p) => p.status === "nuevo" || p.status === "preparando");

  const parsePedido = (raw: string): string[] => {
    try { return JSON.parse(raw); } catch { return [raw]; }
  };

  const abrirTicket = (p: (typeof pedidosListos)[0]) => {
    setTicketDialog({
      open: true,
      comanda: p.comanda,
      mesa: p.mesa,
      items: parsePedido(p.pedido),
      total: p.precio_total,
    });
  };

  const handleCobrar = (comanda: string, mesa: number) => {
    updateStatus(comanda, "pagado");
    setTicketDialog(null);
    setSnackbar({ open: true, message: `✅ Mesa ${mesa} cobrada y liberada` });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.background.default, minHeight: "100vh" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Button variant="outlined" onClick={refreshPedidos}>Actualizar</Button>
      </Stack>

      {/* Pendientes de cobro */}
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: "#2E7D32" }}>
        Mesas listas para cobrar ({pedidosListos.length})
      </Typography>

      {pedidosListos.length === 0 ? (
        <Alert severity="info" sx={{ mb: 4 }}>No hay mesas listas para cobrar en este momento.</Alert>
      ) : (
        <Stack direction="row" flexWrap="wrap" gap={2} sx={{ mb: 5 }}>
          {pedidosListos.map((p) => {
            const items = parsePedido(p.pedido);
            return (
              <Card key={p.comanda} elevation={3} sx={{ width: 300, borderLeft: "6px solid #2E7D32", backgroundColor: "#E8F5E9" }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">{p.comanda}</Typography>
                    <Chip label="Listo" size="small" sx={{ bgcolor: "#2E7D32", color: "white", fontWeight: 700 }} />
                  </Stack>
                  <Typography variant="h5" fontWeight={700}>Mesa {p.mesa}</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Box component="ul" sx={{ m: 0, pl: 2 }}>
                    {items.map((item, i) => (
                      <Typography key={i} component="li" variant="body2">{item}</Typography>
                    ))}
                  </Box>
                  <Typography variant="h6" fontWeight={700} sx={{ mt: 1.5, color: "#2E7D32" }}>
                    Total: ${p.precio_total?.toFixed(2)} MXN
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2, gap: 1 }}>
                  <Button variant="outlined" onClick={() => abrirTicket(p)} sx={{ flex: 1 }}>
                    Ver Ticket
                  </Button>
                  <Button variant="contained" color="success"
                    onClick={() => handleCobrar(p.comanda, p.mesa)} sx={{ flex: 1 }}>
                    Cobrar
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Stack>
      )}

      {/* Órdenes en curso (solo referencia) */}
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: "#F57C00" }}>
        Órdenes en curso ({pedidosEnCurso.length})
      </Typography>
      {pedidosEnCurso.length === 0 ? (
        <Alert severity="success">No hay órdenes pendientes en cocina.</Alert>
      ) : (
        <Stack direction="row" flexWrap="wrap" gap={2}>
          {pedidosEnCurso.map((p) => (
            <Paper key={p.comanda} elevation={1} sx={{ p: 2, width: 220, borderLeft: "4px solid #FF9800" }}>
              <Typography fontWeight={700}>Mesa {p.mesa}</Typography>
              <Chip label={p.status === "nuevo" ? "Nuevo" : "Preparando"} size="small"
                color={p.status === "nuevo" ? "warning" : "info"} sx={{ mb: 1 }} />
              <Typography variant="caption" display="block" color="text.secondary">{p.comanda}</Typography>
              <Typography fontWeight={600}>${p.precio_total?.toFixed(2)} MXN</Typography>
            </Paper>
          ))}
        </Stack>
      )}

      {/* Ticket Dialog */}
      {ticketDialog && (
        <Dialog open={ticketDialog.open} onClose={() => setTicketDialog(null)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ textAlign: "center", fontWeight: 700 }}>
            🧾 Ticket de Cobro
          </DialogTitle>
          <DialogContent>
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Typography variant="h6" fontWeight={700}>COMANDA FLOW</Typography>
              <Typography variant="body2" color="text.secondary">Av. Restaurante 123</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography>Mesa: <strong>{ticketDialog.mesa}</strong></Typography>
              <Typography variant="caption">{ticketDialog.comanda}</Typography>
              <Typography variant="caption" display="block">{new Date().toLocaleString()}</Typography>
            </Box>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Descripción</TableCell>
                  <TableCell align="right">Precio</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ticketDialog.items.map((item, i) => {
                  const parts = item.split(" = ");
                  return (
                    <TableRow key={i}>
                      <TableCell>{parts[0]}</TableCell>
                      <TableCell align="right">{parts[1] || ""}</TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell colSpan={2}><Divider /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>TOTAL</strong></TableCell>
                  <TableCell align="right"><strong>${ticketDialog.total?.toFixed(2)} MXN</strong></TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Typography variant="caption" sx={{ mt: 2, display: "block", textAlign: "center" }}>
              ¡Gracias por su visita!
            </Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
            <Button variant="outlined" onClick={handlePrint}>Imprimir</Button>
            <Button variant="contained" color="success"
              onClick={() => handleCobrar(ticketDialog.comanda, ticketDialog.mesa)} fullWidth>
              Confirmar Cobro
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Snackbar open={snackbar.open} autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity="success" variant="filled" onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Caja;
