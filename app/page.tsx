"use client";

import Cart from "@/components/Cart";
import CartSummery from "@/components/CartSummery";
import DisplayProducts from "@/components/DisplayProducts";
import Sidebar from "@/components/Sidebar";
import Slider from "@/components/Slider";
import { ShoppingProvider } from "@/provider/ShoppingContext";
import React from "react";
import { useEffect, useState } from "react";

export default function Page() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <ShoppingProvider>
      <div className="flex h-full w-full text-black overflow-hidden">
        <Sidebar />
        <div className="flex-1 border-l">
          <div className="h-[70%]">
            <DisplayProducts />
          </div>
          <div className="h-[30%]">
            <Slider />
          </div>
        </div>
        <div className="border-l w-[300px] h-full">
          <CartSummery />
          <Cart />
        </div>
      </div>
    </ShoppingProvider>
  );
}
