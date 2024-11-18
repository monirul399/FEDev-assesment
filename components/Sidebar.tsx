"use client";

import { useShoppingContext } from "@/provider/ShoppingContext";
import React, { useState } from "react";

const categories: string[] = [
  "Electronics",
  "Home Appliances",
  "Fashion",
  "Books",
  "Sports",
  "Furniture",
  "Toys",
  "Beauty",
  "Automotive",
  "Groceries",
];

export default function Sidebar() {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  const { shoppingState, setSelectedCategory } = useShoppingContext();

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="relative ">
      <button
        onClick={toggleSidebar}
        className="h-[60px] w-[20px]  bg-blue-500 text-white rounded absolute top-[calc(50%_-_60px)] rounded-r-full -right-[20px] z-10"
      >
        {isSidebarVisible ? "<" : ">"}
      </button>

      <div
        className={`transition-all duration-[1000ms] ease-in-out ${
          isSidebarVisible ? "w-[300px] opacity-100 p-4" : "w-0 opacity-0"
        } h-full border-r-0 `}
      >
        <h2 className="font-bold mb-4">Categories</h2>
        <ul className="grid grid-cols-2 gap-5">
          {categories.map((category, index) => (
            <li
              key={index}
              className={`text-blue-600 shadow shadow-blue-100 cursor-pointer ${
                shoppingState.selectedCategory === category
                  ? "bg-blue-600 text-white cursor-default"
                  : "hover:text-blue-800 hover:scale-105"
              }`}
              onClick={() => handleCategorySelect(category)}
            >
              <p className="w-full h-[100px] border text-center grid place-content-center">
                <p className="text-2xl font-bold">{category.charAt(0)}</p>
                <p className="text-xs font-light">{category}</p>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
