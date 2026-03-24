export interface Producto {
  id: number;
  tipo: string;
  nombre: string;
  precio: number;
}

export interface Pedido {
  mesa: number;
  pedido: string[];
  precio_total: number;
}

export const getProductos = async (): Promise<Producto[]> => {
  const response = await fetch(`https://comanda-flow-bkn.onrender.com/productos`);
  return response.json();
};

export const sendPedido = async (mesa: number, pedido: string[], precio_total: number): Promise<Pedido[]> => { 
  const response = await fetch(`https://comanda-flow-bkn.onrender.com/pedidos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ mesa, pedido, precio_total })
  });
  return response.json();
};

export const getPedidos = async (): Promise<Pedido[]> => {
  const response = await fetch(`https://comanda-flow-bkn.onrender.com/getPedidos`);
  return response.json();
};