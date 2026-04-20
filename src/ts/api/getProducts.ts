export async function getProducts() {
  const response = await fetch("/src/assets/data.json");
  const data = await response.json();
  return data.data;
}
