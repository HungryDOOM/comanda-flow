import type { Producto, Pedido } from "../components/types/types";

const BASE_URL = "https://comanda-flow-bkn.onrender.com";

export type { Producto, Pedido };

export const getProductos = async (): Promise<Producto[]> => {
  const response = await fetch(`${BASE_URL}/productos`);
  if (!response.ok) throw new Error("Error al obtener productos");
  return response.json();
};

export const sendPedido = async (
  mesa: number,
  pedido: string[],
  precio_total: number,
  comanda: string,
  estado: string
): Promise<Pedido> => {
  const response = await fetch(`${BASE_URL}/pedidos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mesa, pedido, precio_total, comanda, estado }),
  });
  if (!response.ok) throw new Error("Error al enviar pedido");
  return response.json();
};

export const getPedidos = async (): Promise<Pedido[]> => {
  const response = await fetch(`${BASE_URL}/getPedidos`);
  if (!response.ok) throw new Error("Error al obtener pedidos");
  return response.json();
};

export const updatePedidoStatus = async (
  comanda: string,
  estado: "nuevo" | "preparando" | "listo" | "pagado"
): Promise<void> => {
  const response = await fetch(
    `https://comanda-flow-bkn.onrender.com/pedidos/${comanda}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado }),
    }
  );
  if (!response.ok) throw new Error(`Error al actualizar estado: ${response.status}`);
};