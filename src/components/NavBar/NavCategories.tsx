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
          width: 200,
          bgcolor: "background.paper",
          boxShadow: 4,
          p: 2,
        }}
      >
        <Stack spacing={2}>
          <Button onClick={() => setCategoria("platillos")}>Platillos</Button>
          <Button onClick={() => setCategoria("bebidas")}>Bebidas</Button>
          <Button onClick={() => setCategoria("botanas")}>Botanas</Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default NavCategories;