import { products } from "./products.js";
import { formatCurrency } from "./utils/money.js";
import {
  getCartfromStorage,
  getCartQuantity,
  saveToStorage,
} from "./localstorage.js";

const cart = getCartfromStorage();

document.addEventListener("DOMContentLoaded", renderCart);

function findProductInCart(productId) {
  return cart.find((item) => item.id === productId);
}

const productContainer = document.querySelector(".product-container");

function renderProducts() {
  let productContainerHTML = "";

  products.forEach((product) => {
    const isItemInCart = findProductInCart(product.id);

    productContainerHTML += `
    <div class="space-y-10">
            <div class="relative product border rounded-md" data-product-id="${product.id}">
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
            ${
              isItemInCart
                ? ` 
              <div
                     class="js-plus-minus bg-red10  flex items-center gap-7 px-5 py-2 rounded-2xl active:bg-red10  border border-red10"
              data-product-id="${product.id}"
              >         
            <button class="p-2 decrement-icon" data-product-id="${product.id}"><img src="./images/icon-decrement-quantity.svg" alt=""></button>
             <span class="text-white ">${isItemInCart?.quantity}</span>
              <button class="p-2 increment-icon" data-product-id="${product.id}"><img src="./images/icon-increment-quantity.svg" alt="" ></button>
         </div>
       
         
          `
                : ` <div class="plus-and-minus-cont">

                   <button
              class="js-add-to-cart flex items-center gap-3 bg-white px-5 py-2 rounded-2xl active:bg-red10  border border-red10"
              data-product-id="${product.id}"
              >
             <img src="./images/icon-add-to-cart.svg" alt="" class="add-to-cart-icon"/> <span class="add-cart-text">Add to Cart</span>
         </button>
          
          </div> `
            }

              </div>
            </div>
            <div class="title">
              <h3>${product.name}</h3>
              <p>${product.title}</p>
              <p class="text-red10">$${formatCurrency(product.price)}</p>
            </div>
          </div>
  `;
  });

  productContainer.innerHTML = productContainerHTML;
  console.log(cart);

  document.querySelectorAll(".js-add-to-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = e.target.closest(".product").dataset.productId;

      const product = products.find((item) => item.id === productId);
      // console.log(productId, product, products);
      console.log(cart, cart.length);

      if (product) {
        cart.push({ ...product, quantity: 1 });
        renderProducts();
        renderCart();
        saveToStorage(cart);
        getCartQuantity();
      }
    });
  });

  document.querySelectorAll(".increment-icon").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = e.target.closest(".product").dataset.productId;

      const cartItem = findProductInCart(productId);
      if (cartItem) {
        cartItem.quantity++;
        renderProducts();
        renderCart();
        saveToStorage(cart);
        getCartQuantity();
      }
    });
  });

  document.querySelectorAll(".decrement-icon").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = e.target.closest(".product").dataset.productId;

      const cartItem = findProductInCart(productId);
      if (cartItem) {
        if (cartItem.quantity > 1) {
          cartItem.quantity--;
        } else {
          cart.splice(cart.indexOf(cartItem), 1);
        }
        renderProducts();
        renderCart();
        saveToStorage(cart);
        getCartQuantity();
      }
    });
  });
}

document.querySelector(".cart-quantity-count").innerHTML = getCartQuantity();

renderProducts();

function renderCart() {
  const cartContainer = document.querySelector(".cart-container");
  const filledCartContainer = document.querySelector(".filled-cart");

  if (cart.length === 0) {
    cartContainer.innerHTML = `<div class="empty-cart">
        <img src="./images/illustration-empty-cart.svg" alt="" />
        <p>Your added items will appear here</p>
        </div>`;

    if (filledCartContainer) {
      filledCartContainer.innerHTML = "";
    }
    return;
  }

  cartContainer.innerHTML = cart
    .map(
      (item) => `
             <div class="each-cart-item flex justify-between items-center border-b border-gray-300 pb-2" data-product-id="${item.id}">
            <div>
              <h4>${item.name}</h4>
              <div class="flex gap-5">
                <p class="text-rose-600">${item.quantity}x</p>
                <p>
                  <span class="text-gray-600">@${formatCurrency(item.price)}</span>
                  <span class="text-gray-600">$${formatCurrency(item.price * item.quantity)}</span>
                </p>
              </div>
            </div>
            <button class="remove-from-cart border w-5 h-5 flex items-center justify-center rounded-full hover:border-black" data-product-id="${item.id}">
           <i class="fa-solid fa-xmark text-gray-300 hover:text-black"></i>
            </button>
            </div>
    `
    )
    .join("");

  if (filledCartContainer) {
    filledCartContainer.innerHTML = `
        <div class="flex justify-between items-center">
          <p class="text-gray-400">Order Total</p>
          <h class="order-total-count text-2xl font-bold">$${calculateOrderTotal().toFixed(2)}</h>
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex bg-rose100 p-3 rounded-xl justify-center">
            <img src="./images/icon-carbon-neutral.svg" alt="Carbon Neutral Icon" />
            <p>This is a <strong>carbon-neutral</strong> delivery</p>
          </div>
          <button class="bg-red10 p-3 rounded-xl text-white">Confirm Order</button>
        </div>
      `;
  }

  document.querySelectorAll(".remove-from-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = e.target.closest(".each-cart-item").dataset.productId;
      removeItemFromCart(productId);
    });
  });
}

// Function to remove an item from the cart by its ID
function removeItemFromCart(productId) {
  const itemIndex = cart.findIndex((item) => item.id === productId);
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
    renderCart();
    renderProducts();
    saveToStorage(cart);
    getCartQuantity();
  }
}

function calculateOrderTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

getCartQuantity();
