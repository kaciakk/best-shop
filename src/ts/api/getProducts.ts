import type { Product } from "../types/Product";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch("/src/assets/data.json");
  const data = await response.json();
  return data.data;
}
