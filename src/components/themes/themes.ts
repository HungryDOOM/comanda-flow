import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#2E7D32" },   // Verde
    secondary: { main: "#C62828" }, // Rojo
    success: { main: "#0288D1" },   // Azul
    background: {
      default: "#F5F5F5",           // Fondo claro
      paper: "#FFFFFF",             // Fondo de tarjetas
    },
    text: {
      primary: "#212121",
      secondary: "#616161",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
});

export default theme;