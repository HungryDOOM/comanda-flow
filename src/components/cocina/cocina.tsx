// Cocina.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  List,
  ListItem,
  Box,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Pedido {
  id: number;
  mesa: number;
  items: string[];
}

const pedidos: Pedido[] = [
  { id: 1, mesa: 5, items: ["Tacos al pastor", "Agua de horchata"] },
  { id: 2, mesa: 2, items: ["Hamburguesa", "Papas fritas", "Refresco"] },
  { id: 3, mesa: 8, items: ["Ensalada César", "Sopa de tortilla"] },
];

const Cocina: React.FC = () => {
  const theme = useTheme();
  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
      <Typography variant="h4" gutterBottom>
        Órdenes en Cocina
      </Typography>
      <Stack
        direction="row"
        spacing={3}
        flexWrap="wrap"
        justifyContent="flex-start"
      >
        {pedidos.map((pedido) => (
          <Box key={pedido.id} sx={{ width: 300 }}>
            <Card elevation={4}>
              <CardContent>
                <Typography variant="h6" color="primary">
                  Mesa {pedido.mesa}
                </Typography>
                <List>
                  {pedido.items.map((item, index) => (
                    <ListItem key={index} sx={{ pl: 0 }}>
                      • {item}
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="success" fullWidth>
                  Marcar como listo
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Cocina;