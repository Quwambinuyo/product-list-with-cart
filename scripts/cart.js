import { products, getProduct } from "./products.js";
import { formatCurrency } from "./utils/money.js";
import {
  saveToStorage,
  getCartfromStorage,
  getCartQuantity,
} from "./localstorage.js";

const cart = getCartfromStorage();

/** Make sure the exact item clicked was added to the cart */
export function addToCart(productId) {
  let matchingItem;

  /**matching the exact product using id */
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  /**increasing the exact product without duplicating */
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }
  saveToStorage(cart);

  document.querySelector(".cart-quantity-count").textContent =
    getCartQuantity();
}

/** Put cart items into the DOM */
const cartContainer = document.querySelector(".cart-container");
if (cart.length > 0) {
  document.querySelector(".filled-cart").innerHTML = `
  
           <div class="flex justify-between items-center">
            <p class="text-gray-400">Order Total</p>
            <h class="text-2xl font-bold">$40.60</h>
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

    let matchingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    cartContainer.innerHTML += `
    <div
    class="each-cart-item-${
      matchingProduct.id
    } flex justify-between items-center border-b border-gray-300 pb-2"
  >
    <div>
      <h4>${matchingProduct.name}</h4>
      <div class="flex gap-5">
        <p class="text-rose-600">${cartItem.quantity}x</p>
        <p>
          <span class="text-gray-600">@${formatCurrency(
            matchingProduct.price
          )}</span>
          <span class="text-gray-600">$${
            matchingProduct.price * cartItem.quantity
          }</span>
        </p>
      </div>
    </div>
    <button class="remove-from-cart border p-2 rounded-[50%]" data-product-id="${
      matchingProduct.id
    }">
      <img src="./images/icon-remove-item.svg" alt="" />
    </button>
  </div>
          `;
  });
} else {
  cartContainer.innerHTML = `
         <div class="empty-cart">
          <img src="./images/illustration-empty-cart.svg" alt="" />
          <p>Your added items will appear here</p>
        </div>
  `;
}

/** Remove from cart function */
function removeFromCart(productId) {
  const cart = getCartfromStorage();
  const updatedCart = cart.filter((item) => item.productId !== productId);
  saveToStorage(updatedCart);

  document.querySelector(".cart-quantity-count").textContent =
    getCartQuantity();

  console.log(productId);
}

/**Remove items from cart when clicking removeBtn*/
document.querySelectorAll(".remove-from-cart").forEach((removeBtn) => {
  removeBtn.addEventListener("click", (e) => {
    const removeItemId = removeBtn.dataset.productId;
    removeFromCart(removeItemId);

    const cartProductCard = document.querySelector(
      `.each-cart-item-${removeItemId}`
    );
    cartProductCard.remove();
  });
});
