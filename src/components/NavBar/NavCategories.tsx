import React from "react";
import { Stack, Button } from "@mui/material";
import { Box } from "@mui/system";
import type { Categoria } from "../types/types";

interface NavCategoriesProps {
  setCategoria: (c: Categoria) => void;
  categoriaActiva?: Categoria;
}

const categorias: { value: Categoria}[] = [
  { value: "Platillos" },
  { value: "Bebidas" },
  { value: "Botanas" },
];

const NavCategories: React.FC<NavCategoriesProps> = ({ setCategoria, categoriaActiva }) => {
  return (
    <Box>
      <Box
        sx={{
          position: "absolute",
          right: 0,
          top: 64,
          height: "100vh",
          width: "11vw",
          minWidth: 110,
          bgcolor: "background.paper",
          boxShadow: 4,
          p: 2,
          zIndex: 100,
        }}
      >
        <Stack spacing={1.5}>
          {categorias.map((cat) => (
            <Button
              key={cat.value}
              onClick={() => setCategoria(cat.value)}
              variant={categoriaActiva === cat.value ? "contained" : "outlined"}
              color="primary"
              sx={{ flexDirection: "column", py: 1.5, fontWeight: 600 }}
            >
              {cat.value}
            </Button>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default NavCategories;
