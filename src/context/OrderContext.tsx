import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { PedidoLocal, OrderStatus } from "../components/types/types";
import { getPedidos, updatePedidoStatus } from "../services/api";

interface OrderContextType {
  pedidos: PedidoLocal[];
  refreshPedidos: () => Promise<void>;
  updateStatus: (comanda: string, status: OrderStatus) => Promise<void>;
  loading: boolean;
  lastUpdated: Date | null;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pedidos, setPedidos] = useState<PedidoLocal[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

const refreshPedidos = useCallback(async () => {
  setLoading(true);
  try {
    const raw = await getPedidos();

    const local: PedidoLocal[] = raw
      .filter((p) => p.estado !== "pagado")
      .map((p) => ({
        ...p,
        mesa: Number(p.mesa),
        status: p.estado ?? "nuevo",
        timestamp: Date.now(),
      }));

    setPedidos(local);
    setLastUpdated(new Date());
  } catch (err) {
    console.error("Error al cargar pedidos:", err);
  } finally {
    setLoading(false);
  }
}, []);

const updateStatus = useCallback(async (comanda: string, status: OrderStatus) => {
  await updatePedidoStatus(comanda, status);

  // Actualiza UI inmediatamente sin esperar el siguiente refresh
  if (status === "pagado") {
    setPedidos((prev) => prev.filter((p) => p.comanda !== comanda));
  } else {
    setPedidos((prev) =>
      prev.map((p) => (p.comanda === comanda ? { ...p, status, estado: status } : p))
    );
  }
}, []);

  useEffect(() => {
    refreshPedidos();
    const interval = setInterval(refreshPedidos, 30000);
    return () => clearInterval(interval);
  }, [refreshPedidos]);

  return (
    <OrderContext.Provider value={{ pedidos, refreshPedidos, updateStatus, loading, lastUpdated }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders debe usarse dentro de OrderProvider");
  return ctx;
};
