"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type Product = {
  id: string;
  image: string;
  title: string;
  price: number;
  quantity: number;
};

type ShoppingState = {
  selectedCategory: string;
  selectedProducts: Product[];
  totalPrice: number;
  discount: number;
  tax: number;
  finalPrice: number;
};

type ShoppingContextType = {
  shoppingState: ShoppingState;
  setSelectedCategory: (category: string) => void;
  addProductToCart: (product: Product) => void;
  updateProductQuantity: (id: string, quantity: number) => void;
  removeProductFromCart: (id: string) => void;
};

const ShoppingContext = createContext<ShoppingContextType | undefined>(
  undefined
);

export const useShoppingContext = (): ShoppingContextType => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error(
      "useShoppingContext must be used within a ShoppingProvider"
    );
  }
  return context;
};

export const ShoppingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [shoppingState, setShoppingState] = useState<ShoppingState>({
    selectedCategory: "Electronics",
    selectedProducts: [],
    totalPrice: 0,
    discount: 0,
    tax: 0,
    finalPrice: 0,
  });

  const setSelectedCategory = (category: string) => {
    setShoppingState((prev) => ({ ...prev, selectedCategory: category }));
  };

  const addProductToCart = (product: Product) => {
    setShoppingState((prev) => ({
      ...prev,
      selectedProducts: [...prev.selectedProducts, product],
    }));
  };

  const updateProductQuantity = (id: string, delta: number) => {
    setShoppingState((prev) => ({
      ...prev,
      selectedProducts: prev.selectedProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + delta }
          : product
      ),
    }));
  };

  const removeProductFromCart = (id: string) => {
    setShoppingState((prev) => ({
      ...prev,
      selectedProducts: prev.selectedProducts.filter(
        (product) => product.id !== id
      ),
    }));
  };

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = shoppingState.selectedProducts.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      );
      const discount = (total * 5) / 100;
      const tax = ((total - discount) * 10) / 100;
      const final = total - discount + tax;

      setShoppingState((prev) => ({
        ...prev,
        totalPrice: Number(total.toFixed(2)),
        discount: Number(discount.toFixed(2)),
        tax: Number(tax.toFixed(2)),
        finalPrice: Number(final.toFixed(2)),
      }));
    };

    calculateTotalPrice();
  }, [shoppingState.selectedProducts]);

  return (
    <ShoppingContext.Provider
      value={{
        shoppingState,
        setSelectedCategory,
        addProductToCart,
        updateProductQuantity,
        removeProductFromCart,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};
