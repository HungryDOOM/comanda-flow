import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { PedidoLocal, OrderStatus } from "../components/types/types";
import { getPedidos } from "../services/api";

interface OrderContextType {
  pedidos: PedidoLocal[];
  refreshPedidos: () => Promise<void>;
  updateStatus: (comanda: string, status: OrderStatus) => void;
  loading: boolean;
  lastUpdated: Date | null;
}

const OrderContext = createContext<OrderContextType | null>(null);

const STATUS_KEY = "cf_order_statuses";
const PAID_KEY = "cf_paid_comandas";

function loadStatuses(): Record<string, OrderStatus> {
  try {
    return JSON.parse(localStorage.getItem(STATUS_KEY) || "{}");
  } catch {
    return {};
  }
}

function loadPaid(): string[] {
  try {
    return JSON.parse(localStorage.getItem(PAID_KEY) || "[]");
  } catch {
    return [];
  }
}

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pedidos, setPedidos] = useState<PedidoLocal[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const refreshPedidos = useCallback(async () => {
    setLoading(true);
    try {
      const raw = await getPedidos();
      const statuses = loadStatuses();
      const paid = loadPaid();

      const local: PedidoLocal[] = raw
        .filter((p) => !paid.includes(p.comanda))
        .map((p) => ({
          ...p,
          status: statuses[p.comanda] ?? "nuevo",
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

  const updateStatus = useCallback((comanda: string, status: OrderStatus) => {
    const statuses = loadStatuses();

    if (status === "pagado") {
      const paid = loadPaid();
      if (!paid.includes(comanda)) {
        localStorage.setItem(PAID_KEY, JSON.stringify([...paid, comanda]));
      }
      delete statuses[comanda];
      localStorage.setItem(STATUS_KEY, JSON.stringify(statuses));
      setPedidos((prev) => prev.filter((p) => p.comanda !== comanda));
    } else {
      statuses[comanda] = status;
      localStorage.setItem(STATUS_KEY, JSON.stringify(statuses));
      setPedidos((prev) =>
        prev.map((p) => (p.comanda === comanda ? { ...p, status } : p))
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
