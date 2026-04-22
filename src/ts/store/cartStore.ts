export function getLocalStorageCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}
export function setLocalStorageCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function clearLocalStorageCart() {
  localStorage.removeItem("cart");
}

export function addToCart(product) {
  const localStorageItems = getLocalStorageCart();

  const existingItem = localStorageItems.find((item) => {
    return item.id === product.id;
  });

  if (existingItem) {
    const updateCart = localStorageItems.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setLocalStorageCart(updateCart);
  } else {
    setLocalStorageCart([...localStorageItems, product]);
  }
}
