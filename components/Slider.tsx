import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchImagesAndGenerateData } from "@/assset/fakeData";

type Product = {
  id: string;
  category: string;
  title: string;
  price: number;
  image: string;
};

const Slider = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchImagesAndGenerateData().then((data) => {
      setProducts(data);
    });
  }, []);

  const handleScroll = (event: React.WheelEvent) => {
    event.stopPropagation();
    if (sliderRef.current) {
      if (event.deltaY > 0) {
        sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
      } else {
        sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
      }
    }
  };

  const nextProduct = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const prevProduct = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  return (
    <div className="slider-container" onWheel={handleScroll}>
      <div>
        <button className="slider-button prev-button" onClick={prevProduct}>
          &#8592;
        </button>

        <div ref={sliderRef} className="slider-wrapper scrollbar-hide">
          {products.map((product) => (
            <div key={product.id} className="slider-item">
              <ProductCard
                product={product}
                showCheckbox={false}
                showPrice={false}
                customHeight={120}
                customWidth={150}
              />
            </div>
          ))}
        </div>

        <button className="slider-button next-button" onClick={nextProduct}>
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Slider;
