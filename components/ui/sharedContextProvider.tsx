//Shared context provider
"use client";

import { useContext, createContext } from "react";
import { useCart, CartItem } from "@/lib/cart-context";

interface SharedContextProviderTypes {
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const ProviderForSharedState = createContext<
  SharedContextProviderTypes | undefined
>(undefined);

export function SharedContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setItems } = useCart();
  const value = {
    setItems,
  };
  return (
    <ProviderForSharedState.Provider value={value}>
      {children}
    </ProviderForSharedState.Provider>
  );
}

export function useSharedContext() {
  const context = useContext(ProviderForSharedState);
  if (context === undefined) {
    throw new Error(
      "useSharedContext must be used within a SharedContextProvider",
    );
  }
  return context;
}
