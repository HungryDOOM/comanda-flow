import React from "react";
import { Stack, Button } from "@mui/material";
import { Box } from "@mui/system";
import type { Categoria } from "../types/types";

interface NavCategoriesProps {
  setCategoria: (c: Categoria) => void;
}

const NavCategories: React.FC<NavCategoriesProps> = ({ setCategoria }) => {
  return (
    <Box>
      <Box
        sx={{
          position: "fixed",
          right: 0,
          top: 64,
          height: "100vh",
          width: "10vw",
          bgcolor: "background.paper",
          boxShadow: 4,
          p: 2,
        }}
      >
        <Stack spacing={2}>
          <Button onClick={() => setCategoria("Platillos")}>Platillos</Button>
          <Button onClick={() => setCategoria("Bebidas")}>Bebidas</Button>
          <Button onClick={() => setCategoria("Botanas")}>Botanas</Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default NavCategories;