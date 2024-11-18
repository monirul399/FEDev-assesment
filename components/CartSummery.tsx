"use client";

import { useShoppingContext } from "@/provider/ShoppingContext";
import React from "react";

export default function CartSummery() {
  const { shoppingState } = useShoppingContext();

  return (
    <div className="w-full p-4 pt-0 my-4">
      <h2 className="font-bold mb-4">Cart Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Total Price</span>
          <span>${shoppingState.totalPrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Total Discount 5%</span>
          <span>-${shoppingState.discount}</span>
        </div>

        <div className="flex justify-between">
          <span>Total Tax (10%)</span>
          <span>+${shoppingState.tax}</span>
        </div>

        <div className="flex justify-between font-semibold">
          <span>Final Price</span>
          <span>${shoppingState.finalPrice}</span>
        </div>
      </div>
    </div>
  );
}
