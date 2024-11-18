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

  const cartItemCount = document.querySelector(".cart-quantity-count");
  const cartCount = cart.reduce((acc, cur) => acc + cur?.quantity, 0);

  if (cartItemCount) {
    cartItemCount.textContent = cartCount;
  }
}
