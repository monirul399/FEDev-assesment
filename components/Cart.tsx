"use client";

import { useShoppingContext } from "@/provider/ShoppingContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Cart() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hoverData, setHoverData] = useState({
    id: "",
    description: "",
    index: 1,
  });
  const { shoppingState, updateProductQuantity, removeProductFromCart } =
    useShoppingContext();

  const handleQuantityChange = (id: string, delta: number) => {
    updateProductQuantity(id, delta);
  };

  const handleRemoveProduct = (id: string) => {
    removeProductFromCart(id);
  };

  useEffect(() => {
    console.log(showTooltip, hoverData);
  }, [showTooltip, hoverData]);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Cart</h2>

      <div className="h-[calc(100vh_-_280px)] overflow-y-auto overflow-x-hidden">
        {shoppingState.selectedProducts.length > 0 ? (
          <div className={`${Number(hoverData.index) == 0 ? "mt-[50px]" : ""}`}>
            {shoppingState.selectedProducts.map((product, idx) => (
              <div
                key={product.id}
                className="cart-item relative"
                onMouseOver={() => {
                  setShowTooltip(true);
                  setHoverData({
                    id: product.id,
                    description: product.description,
                    index: idx,
                  });
                }}
                onMouseLeave={() => {
                  setShowTooltip(false);
                  setHoverData({
                    id: "",
                    description: "",
                    index: 1,
                  });
                }}
              >
                {showTooltip && hoverData.id === product.id && (
                  <div className="absolute top-[-50px] w-[90%] h-[50px] overflow-y-auto shadow-lg !z-[1000] bg-blue-500 py-1 px-2 rounded-md shadow-blue-200 text-sm">
                    {hoverData.description}
                  </div>
                )}
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
    </div>
  );
}
