export type Categoria = "Platillos" | "Bebidas" | "Botanas";

export type OrderStatus = "nuevo" | "preparando" | "listo" | "pagado";

export interface Producto {
  id: number;
  tipo: string;
  nombre: string;
  precio: number;
  img_url: string;
}

export interface Pedido {
  mesa: number;
  pedido: string;
  precio_total: number;
  comanda: string;
}

export interface PedidoLocal extends Pedido {
  status: OrderStatus;
  timestamp: number;
}
