"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./auth-context";
import axios from "axios";
import { BEendpoints } from "@/constants/urls/backendUrls";
import { toast } from "sonner";
import { ProductTypes } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  specs?: string;
  category: string;
}

interface SubmitOrderFieldsTypes {
  name: string;
  email: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode?: string;
  products: Omit<
    ProductTypes,
    "stock" | "ratings" | "reviews" | "features" | "description"
  >[];
}

interface CartContextType {
  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  submitOrder: (details: SubmitOrderFieldsTypes) => Promise<boolean>;
  total: number;
  itemCount: number;
  syncWithBackend: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const initializeCart = async () => {
      if (!user) return;
      console.log("stop 2");

      try {
        const res = await axios.get(BEendpoints.get_cart_items(user?.id));
        if (res.data.ok) setItems(res.data.data);
        else throw new Error(res.data.message);
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message || "Failed to initialize cart");
        }
      }
    };
    initializeCart();
  }, [user]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = async (newItem: CartItem) => {
    if (!user) throw new Error("User must be logged in");

    try {
      //adding item on DB
      const res = await axios.post(BEendpoints.add_to_cart, {
        productId: newItem.id,
        userId: user.id,
        quantity: newItem.quantity,
      });
      if (res.data.ok) toast.success("Added to cart");
      else throw new Error("Failed to update cart");
    } catch (err) {
      toast.error("Failed to update cart");
      return;
    }
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
      }

      return [...prevItems, newItem];
    });
  };

  const removeItem = async (itemId: string) => {
    if (!user!.id) return;

    try {
      const res = await axios.delete(
        BEendpoints.delete_cart_item(user!.id, itemId),
      );
      if (res.data.ok) toast.success("Item deleted successfully");
      else throw new Error("Failed to update cart");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "couldn't delete item");
      return;
    }
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    if (!user) return;

    try {
      const res = await axios.patch(
        BEendpoints.update_cart_item(user?.id, itemId, quantity),
      );
    } catch (err) {
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = async () => {
    if (!user) return;
    try {
      const res = await axios.delete(BEendpoints.clear_cart(user.id));
      if (res.data.ok) toast.success("Cleared cart succesfully");
      else throw new Error("Failed to update cart");
    } catch (err) {
      return toast.error(
        err instanceof Error ? err.message : "couldn't clear cart",
      );
    }
    setItems([]);
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const submitOrder = async (
    details: SubmitOrderFieldsTypes,
  ): Promise<boolean> => {
    if (!user) return false;
    try {
      const res = await axios.post(BEendpoints.submit_order(user.id), details);
      if (!res.data.ok)
        throw new Error(res.data.message || "Couldn't submit order");

      toast.success("Submitted Order");
      return true;
    } catch (err) {
      toast.error("Failed to submit order");
      return false;
    }
  };
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const syncWithBackend = async () => {
    if (!isAuthenticated || !user) {
      throw new Error("User must be authenticated to sync cart");
    }

    try {
      const token = localStorage.getItem("auth_token");
      await axios.post(
        `${API_BASE_URL}/api/cart/sync`,
        { items },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error: any) {
      console.error("[v0] Cart sync error:", error);
      throw error;
    }
  };

  const value: CartContextType = {
    items,
    setItems,
    addItem,
    removeItem,
    submitOrder,
    updateQuantity,
    clearCart,
    total,
    itemCount,
    syncWithBackend,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
