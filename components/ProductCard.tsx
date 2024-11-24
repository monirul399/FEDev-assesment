// components/ProductCard.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useShoppingContext } from "@/provider/ShoppingContext"; // Import context to access addProductToCart and removeProductFromCart

type Product = {
  id: string;
  category: string;
  title: string;
  price: number;
  image: string;
  description: string;
};

type ProductCardProps = {
  product: Product;
  showCheckbox?: boolean;
  showPrice?: boolean;
  customHeight?: number;
  customWidth?: number;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showCheckbox = true,
  showPrice = true,
  customHeight = 150,
  customWidth = 190,
}) => {
  const { shoppingState, addProductToCart, removeProductFromCart } =
    useShoppingContext();

  const [isSelected, setIsSelected] = useState(
    shoppingState.selectedProducts.some((item) => item.id === product.id)
  );

  const handleCheckboxChange = () => {
    setIsSelected((prev) => !prev);

    if (!isSelected) {
      addProductToCart({
        ...product,
        quantity: 1,
      });
    } else {
      removeProductFromCart(product.id);
    }
  };

  useEffect(() => {
    setIsSelected(
      shoppingState.selectedProducts.some((item) => item.id === product.id)
    );
  }, [shoppingState.selectedProducts, product.id]);

  return (
    <div className="border p-2 shadow-lg rounded-md relative ">
      <Image
        src={product.image}
        alt={product.title}
        className={`max-h-full !min-w-full object-cover mb-2 hover:scale-105 duration-1000`}
        style={{
          width: customWidth,
          height: customHeight,
        }}
        width={80}
        height={80}
      />
      <h3 className="text-sm font-semibold pb-2">{product.title}</h3>
      {showPrice && (
        <p className="text-sm text-gray-600">Price: ${product.price}</p>
      )}

      {showCheckbox && (
        <div className="absolute top-4 right-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
            className="w-5 h-5 cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
