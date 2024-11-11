import { products, getProduct } from "./products.js";
import { formatCurrency } from "./utils/money.js";
import {
  saveToStorage,
  getCartfromStorage,
  getCartQuantity,
} from "./localstorage.js";

// Get cart data from storage
const cart = getCartfromStorage();

/** Function to update the order total and set it in the DOM */
function updateOrderTotal() {
  const cart = getCartfromStorage();
  let total = 0;

  cart.forEach((cartItem) => {
    const product = products.find(
      (product) => product.id === cartItem.productId
    );
    if (product) {
      total += product.price * cartItem.quantity;
    }
  });

  /**setting total cost of items to the dom */
  const totalCostItem = document.querySelector(".order-total-count");
  if (totalCostItem) {
    totalCostItem.textContent = formatCurrency(total);
  }
}

/** Function to add a product to the cart */
export function addToCart(productId) {
  let matchingItem;

  // Check if the product is already in the cart
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  // Increase the quantity or add a new item
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }
  saveToStorage(cart);

  // Update cart quantity in the DOM
  const cartItemCount = document.querySelector(".cart-quantity-count");
  if (cartItemCount) {
    cartItemCount.textContent = getCartQuantity();
  }

  // Update the order total
  updateOrderTotal();
}

// Render cart items into the DOM after ensuring the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".cart-container");
  if (cart.length > 0) {
    document.querySelector(".filled-cart").innerHTML = `
      <div class="flex justify-between items-center">
        <p class="text-gray-400">Order Total</p>
        <h class="order-total-count text-2xl font-bold"></h>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex bg-rose-100 p-3 rounded-xl justify-center">
          <img src="./images/icon-carbon-neutral.svg" alt="" />
          <p>This is a <strong>carbon-neutral</strong> delivery</p>
        </div>
        <button class="bg-rose-700 p-3 rounded-xl text-white">
          Confirm Order
        </button>
      </div>
    `;

    cart.forEach((cartItem) => {
      const productId = cartItem.productId;
      const matchingProduct = products.find(
        (product) => product.id === productId
      );

      if (matchingProduct) {
        cartContainer.innerHTML += `
          <div class="each-cart-item-${matchingProduct.id} flex justify-between items-center border-b border-gray-300 pb-2">
            <div>
              <h4>${matchingProduct.name}</h4>
              <div class="flex gap-5">
                <p class="text-rose-600">${cartItem.quantity}x</p>
                <p>
                  <span class="text-gray-600">@${formatCurrency(matchingProduct.price)}</span>
                  <span class="text-gray-600">$${formatCurrency(matchingProduct.price * cartItem.quantity)}</span>
                </p>
              </div>
            </div>
            <button class="remove-from-cart border p-2 rounded-[50%]" data-product-id="${matchingProduct.id}">
              <img src="./images/icon-remove-item.svg" alt="" />
            </button>
          </div>
        `;
      }
    });
  } else {
    cartContainer.innerHTML = `
      <div class="empty-cart">
        <img src="./images/illustration-empty-cart.svg" alt="" />
        <p>Your added items will appear here</p>
      </div>
    `;
  }

  // Call updateOrderTotal to initialize the total correctly
  updateOrderTotal();

  /** Remove items from cart when clicking remove button */
  document.querySelectorAll(".remove-from-cart").forEach((removeBtn) => {
    removeBtn.addEventListener("click", (e) => {
      const removeItemId = removeBtn.dataset.productId;
      removeFromCart(removeItemId);

      const cartProductCard = document.querySelector(
        `.each-cart-item-${removeItemId}`
      );
      if (cartProductCard) {
        cartProductCard.remove();
      }

      updateOrderTotal();
    });
  });
});

/** Function to remove an item from the cart */
function removeFromCart(productId) {
  const cart = getCartfromStorage();
  const updatedCart = cart.filter((item) => item.productId !== productId);
  saveToStorage(updatedCart);

  const quantityElement = document.querySelector(".cart-quantity-count");
  if (quantityElement) {
    quantityElement.textContent = getCartQuantity();
  }
}
