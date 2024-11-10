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
            <div class="relative">
              <img 
                class="md:hidden sm:rounded-md"
                src="${product.image}"
                alt=""
              />
              <img 
                class="hidden md:inline rounded-xl"
                src="${product.image}"
                alt=""
              />

              <div
                class="absolute right-0 left-0 -bottom-5 flex justify-center "
              >
          <button 
              class="js-add-to-cart flex items-center gap-3 bg-white px-5 py-2 rounded-2xl border border-red-600"
              data-product-id="${product.id}"
              >
             <img src="./images/icon-add-to-cart.svg" alt="" /> Add to cart
         </button>

              </div>
            </div>
            <div class="title">
              <h3>${product.name}</h3>
              <p>${product.title}</p>
              <p class="text-red-600">$${formatCurrency(product.price)}</p>
            </div>
          </div>`;
});

document.querySelector(".cart-quantity-count").innerHTML = getCartQuantity();

document.querySelectorAll(".js-add-to-cart").forEach((cartBtn) => {
  cartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const productId = cartBtn.dataset.productId;
    addToCart(productId);
  });
});

console.log(cart);
