import { fetchImagesAndGenerateData, Product } from "@/assset/fakeData";
import { useShoppingContext } from "@/provider/ShoppingContext";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function DisplayProducts() {
  const { shoppingState } = useShoppingContext();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchImagesAndGenerateData().then((data) => {
      setProducts(data);
    });
  }, []);

  const filteredProducts = products.filter(
    (product) => product.category === shoppingState.selectedCategory
  );
  console.log({ shoppingState });
  return (
    <div className="w-full border-y h-full overflow-hidden">
      <h2 className="font-bold mb-2 py-[10px] px-[30px]">
        Products in {`"${shoppingState.selectedCategory}"`} Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 h-[calc(100%_-_70px)] overflow-y-auto px-[30px]">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products available in this category</p>
        )}
      </div>
    </div>
  );
}
