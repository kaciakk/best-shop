export function calculateDiscount(subTotal, discountStage, discountPercentage) {
    if (subTotal >= discountStage) {
        return subTotal * discountPercentage;
    }
    return 0;
}
export function calculateSubTotal(cart) {
    return cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
}
export function calculateTotal(subTotal, discountValue, shippingValue) {
    return subTotal - discountValue + shippingValue;
}
