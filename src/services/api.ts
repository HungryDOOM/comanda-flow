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
  const response = await fetch(`http://localhost:3001/productos`);
  return response.json();
};

export const sendPedido = async (mesa: number, pedido: string[], precio_total: number): Promise<Pedido[]> => { 
  const response = await fetch(`http://localhost:3001/pedidos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ mesa, pedido, precio_total })
  });
  return response.json();
};

export const getPedidos = async (): Promise<Pedido[]> => {
  const response = await fetch(`http://localhost:3001/getPedidos`);
  return response.json();
};