const CART_KEY = "cart";
export function getLocalStorageCart() {
    var _a;
    return JSON.parse((_a = localStorage.getItem(CART_KEY)) !== null && _a !== void 0 ? _a : "[]");
}
export function setLocalStorageCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
export function clearLocalStorageCart() {
    localStorage.removeItem(CART_KEY);
}
export function addToCart(product) {
    var _a;
    const localStorageItems = getLocalStorageCart();
    const existingItem = localStorageItems.find((item) => item.id === product.id);
    if (existingItem) {
        const updatedCart = localStorageItems.map((item) => {
            if (item.id === product.id) {
                return Object.assign(Object.assign({}, item), { quantity: item.quantity + product.quantity });
            }
            return item;
        });
        setLocalStorageCart(updatedCart);
        return;
    }
    setLocalStorageCart([
        ...localStorageItems,
        Object.assign(Object.assign({}, product), { quantity: (_a = product.quantity) !== null && _a !== void 0 ? _a : 1 }),
    ]);
}
