import {
  saveToStorage,
  getCartfromStorage,
  getCartQuantity,
} from "./localstorage.js";
import { products } from "./products.js";
import { formatCurrency } from "./utils/money.js";
import { addToCart } from "./cart.js";

const cart = getCartfromStorage();

products.forEach((product) => {
  const productContainer = document.querySelector(".product-container");
  productContainer.innerHTML += `<div class="space-y-10">
            <div class="relative border border-red10 rounded-md">
              <img
                class="md:hidden sm:rounded-md"
                src="${product.image}"
                alt=""
              />
              <img
                class="hidden  md:inline sm:rounded-md"
                src="${product.image}"
                alt=""
              />

              <div
                class="absolute right-0 left-0 -bottom-5 flex justify-center"
              >
          <button
              class="js-add-to-cart flex items-center gap-3 bg-white px-5 py-2 rounded-2xl active:bg-red10  border border-red10"
              data-product-id="${product.id}"
              >
             <img src="./images/icon-add-to-cart.svg" alt="" class="add-to-cart-icon"/> <span class="add-cart-text">Add to Cart</span>
             <img src="./images/icon-increment-quantity.svg" alt="" class="increment-icon hidden">
             <span class="text-white hidden"></span>
             <img src="./images/icon-decrement-quantity.svg" alt="" class="decrement-icon hidden"/>
         </button>

              </div>
            </div>
            <div class="title">
              <h3>${product.name}</h3>
              <p>${product.title}</p>
              <p class="text-red10">$${formatCurrency(product.price)}</p>
            </div>
          </div>`;
});

// Update the cart quantity count display
document.querySelector(".cart-quantity-count").innerHTML = getCartQuantity();

document.querySelectorAll(".js-add-to-cart").forEach((cartBtn) => {
  cartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const productId = cartBtn.dataset.productId;
    addToCart(productId);

    const addToCartIcon = cartBtn.querySelector(".add-to-cart-icon");
    const incrementIcon = cartBtn.querySelector(".increment-icon");
    const decrementIcon = cartBtn.querySelector(".decrement-icon");
    const cartText = cartBtn.querySelector(".add-cart-text");
    const quantityText = cartBtn.querySelector(".text-white");

    cartBtn.classList.add("bg-red10");

    if (cartText) cartText.classList.add("hidden");
    if (addToCartIcon) addToCartIcon.classList.add("hidden");
    if (incrementIcon) incrementIcon.classList.remove("hidden");
    if (decrementIcon) decrementIcon.classList.remove("hidden");
    if (quantityText) quantityText.classList.remove("hidden");

    incrementIcon.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(123);
    });

    decrementIcon.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(456);
    });
  });
});
