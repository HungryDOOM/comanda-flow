import React from "react";
import { Box, Typography, Grid, Card, CardContent, Chip, Stack } from "@mui/material";
import { useOrders } from "../../context/OrderContext";

const TOTAL_MESAS = 10;

const Home: React.FC = () => {
  const { pedidos } = useOrders();

  const getMesaStatus = (mesa: number) => {
    const ordenes = pedidos.filter((p) => p.mesa === mesa);
    if (ordenes.length === 0) return "libre";
    if (ordenes.some((p) => p.status === "listo")) return "lista";
    return "ocupada";
  };

  const statusConfig = {
    libre: { label: "Libre", color: "#4CAF50", bg: "#E8F5E9" },
    ocupada: { label: "Ocupada", color: "#FF9800", bg: "#FFF3E0" },
    lista: { label: "Lista para cobrar", color: "#2196F3", bg: "#E3F2FD" },
  };

  const counts = {
    libres: Array.from({ length: TOTAL_MESAS }, (_, i) => i + 1).filter((m) => getMesaStatus(m) === "libre").length,
    ocupadas: Array.from({ length: TOTAL_MESAS }, (_, i) => i + 1).filter((m) => getMesaStatus(m) === "ocupada").length,
    listas: Array.from({ length: TOTAL_MESAS }, (_, i) => i + 1).filter((m) => getMesaStatus(m) === "lista").length,
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, minHeight: "100vh", backgroundColor: "#F5F5F5" }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Dashboard
      </Typography>

      {/* Resumen de mesas */}
      <Stack direction="row" spacing={2} sx={{ mb: 4 }} flexWrap="wrap" gap={1}>
        {Object.entries(counts).map(([key, val]) => {
          const labels: Record<string, string> = { libres: "Libres", ocupadas: "Ocupadas", listas: "Listas" };
          const colors: Record<string, "success" | "warning" | "info"> = { libres: "success", ocupadas: "warning", listas: "info" };
          return (
            <Chip
              key={key}
              label={`${labels[key]}: ${val}`}
              color={colors[key]}
              variant="filled"
              sx={{ fontSize: "1rem", px: 1, py: 2.5, fontWeight: 600 }}
            />
          );
        })}
      </Stack>

      {/* Grid de mesas */}
      <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
        Estado de Mesas
      </Typography>
      <Grid container spacing={2} sx={{ mb: 5 }}>
        {Array.from({ length: TOTAL_MESAS }, (_, i) => i + 1).map((mesa) => {
          const status = getMesaStatus(mesa);
          const cfg = statusConfig[status];
          const ordenes = pedidos.filter((p) => p.mesa === mesa);
          return (
            <Grid key={mesa} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
              <Card
                elevation={2}
                sx={{
                  borderLeft: `5px solid ${cfg.color}`,
                  backgroundColor: cfg.bg,
                  transition: "transform 0.15s",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                <CardContent sx={{ textAlign: "center", py: 2 }}>
                  <Typography variant="h6" fontWeight={700}>
                    Mesa {mesa}
                  </Typography>
                  <Chip label={cfg.label} size="small" sx={{ bgcolor: cfg.color, color: "white", fontWeight: 600 }} />
                  {ordenes.length > 0 && (
                    <Typography variant="caption" display="block" sx={{ mt: 0.5, color: "text.secondary" }}>
                      {ordenes.length} orden{ordenes.length > 1 ? "es" : ""}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Home;
