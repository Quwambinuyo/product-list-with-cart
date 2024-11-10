export function saveToStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function getCartfromStorage() {
  const cartLS = localStorage.getItem("cart");

  if (cartLS) {
    return JSON.parse(cartLS);
  } else {
    return [];
  }
}

export function getCartQuantity() {
  const cart = getCartfromStorage();
  return cart.reduce((acc, cur) => acc + cur?.quantity, 0);
}
