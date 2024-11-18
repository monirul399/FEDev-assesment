"use client";

import { useShoppingContext } from "@/provider/ShoppingContext";
import Image from "next/image";
import React from "react";

export default function Cart() {
  const { shoppingState, updateProductQuantity, removeProductFromCart } =
    useShoppingContext();

  const handleQuantityChange = (id: string, delta: number) => {
    updateProductQuantity(id, delta);
  };

  const handleRemoveProduct = (id: string) => {
    removeProductFromCart(id);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Cart</h2>

      {shoppingState.selectedProducts.length > 0 ? (
        <div className="cart-items-container">
          {shoppingState.selectedProducts.map((product) => (
            <div key={product.id} className="cart-item">
              <div className="cart-item-details">
                <Image
                  src={product.image}
                  alt={product.title}
                  className="cart-item-image"
                  height={20}
                  width={20}
                />
                <div className="cart-item-info">
                  <div className="cart-item-title-price">
                    <p className="cart-item-title">{product.title}</p>
                    <p className="cart-item-price">${product.price}</p>
                  </div>
                  <div className="cart-item-controls">
                    <button
                      onClick={() => handleQuantityChange(product.id, -1)}
                      className="quantity-btn"
                      disabled={product.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity">{product.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(product.id, 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveProduct(product.id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="cart-empty">Your cart is empty.</p>
      )}
    </div>
  );
}
