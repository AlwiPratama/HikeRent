import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { EquipmentItem } from "@/constants/equipment";

export interface RentalOrder {
  id: number;
  equipmentId: number;
  name: string;
  quantity: number;
  totalPerDay: number;
  createdAt: string;
  status: "Menunggu konfirmasi";
}

interface HikeRentContextValue {
  favoriteIds: number[];
  orders: RentalOrder[];
  toggleFavorite: (equipmentId: number) => void;
  addOrder: (item: EquipmentItem, quantity: number) => void;
}

const HikeRentContext = createContext<HikeRentContextValue | null>(null);

export function HikeRentProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [orders, setOrders] = useState<RentalOrder[]>([]);

  const toggleFavorite = useCallback((equipmentId: number) => {
    setFavoriteIds((current) =>
      current.includes(equipmentId)
        ? current.filter((id) => id !== equipmentId)
        : [...current, equipmentId],
    );
  }, []);

  const addOrder = useCallback((item: EquipmentItem, quantity: number) => {
    setOrders((current) => [
      {
        id: Date.now(),
        equipmentId: item.id,
        name: item.name,
        quantity,
        totalPerDay: item.pricePerDay * quantity,
        createdAt: new Date().toISOString(),
        status: "Menunggu konfirmasi",
      },
      ...current,
    ]);
  }, []);

  const value = useMemo(
    () => ({ favoriteIds, orders, toggleFavorite, addOrder }),
    [favoriteIds, orders, toggleFavorite, addOrder],
  );

  return <HikeRentContext.Provider value={value}>{children}</HikeRentContext.Provider>;
}

export function useHikeRent() {
  const context = useContext(HikeRentContext);

  if (!context) {
    throw new Error("useHikeRent harus digunakan di dalam HikeRentProvider.");
  }

  return context;
}
