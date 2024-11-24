import { v4 as uuidv4 } from "uuid";

type ImageData = {
  download_url: string;
};

export type Product = {
  id: string;
  category: string;
  title: string;
  price: number;
  image: string;
  description: string;
};

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
const productsPerCategory = 10;

export const data: Product[] = [];

export async function fetchImagesAndGenerateData(): Promise<Product[]> {
  try {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=2&limit=100"
    );
    const images: ImageData[] = await response.json();

    let imageIndex = 0;

    categories.forEach((category) => {
      for (let i = 1; i <= productsPerCategory; i++) {
        const image = images[imageIndex].download_url;
        data.push({
          id: uuidv4(),
          category: category,
          title: `${category} Product ${i}`,
          price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
          image: image,
          description: `description of Product ${i} in ${category}`,
        });
        imageIndex++;
      }
    });

    return data;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}
