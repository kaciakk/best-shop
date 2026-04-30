const CART_KEY = "cart";
export function getLocalStorageCart() {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}
export function setLocalStorageCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
export function clearLocalStorageCart() {
    localStorage.removeItem(CART_KEY);
}
export function addToCart(product) {
    const localStorageItems = getLocalStorageCart();
    const existingItem = localStorageItems.find((item) => {
        return item.id === product.id;
    });
    if (existingItem) {
        const updatedCart = localStorageItems.map((item) => {
            if (item.id === product.id) {
                return Object.assign(Object.assign({}, item), { quantity: item.quantity + product.quantity });
            }
            return item;
        });
        setLocalStorageCart(updatedCart);
    }
    else {
        setLocalStorageCart([
            ...localStorageItems,
            Object.assign(Object.assign({}, product), { quantity: product.quantity || 1 }),
        ]);
    }
}
