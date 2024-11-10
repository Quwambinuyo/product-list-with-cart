export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}

export const products = [
  {
    id: "200",
    image: "./images/image-waffle-mobile.jpg",
    name: "Waffle",
    title: "Waffle with Berries",
    price: 6.5,
    quantity: 1,
  },

  {
    id: "201",
    image: "./images/image-baklava-mobile.jpg",
    name: "Baklava",
    title: "Pistachio Baklava",
    price: 4.0,
    quantity: 1,
  },

  {
    id: "202",
    image: "./images/image-brownie-mobile.jpg",
    name: "Brownie",
    title: "Salted Caramel Brownie",
    price: 5.5,
    quantity: 1,
  },

  {
    id: "203",
    image: "./images/image-cake-mobile.jpg",
    name: "Cake",
    title: "Red Velvet Cake",
    price: 4.5,
    quantity: 1,
  },

  {
    id: "204",
    image: "./images/image-creme-brulee-mobile.jpg",
    name: "Creme",
    title: "Vanilla Bean Creme Brulee",
    price: 7.0,
    quantity: 1,
  },

  {
    id: "205",
    image: "./images/image-macaron-mobile.jpg",
    name: "Macaron",
    title: "Macaron Mix of Five",
    price: 6.0,
    quantity: 1,
  },

  {
    id: "206",
    image: "./images/image-meringue-mobile.jpg",
    name: "Meringue",
    title: "Lemon Meringue Pie",
    price: 5.0,
    quantity: 1,
  },

  {
    id: "207",
    image: "./images/image-tiramisu-mobile.jpg",
    name: "Tiramisu",
    title: "Classic Tiramisu",
    price: 5.0,
    quantity: 1,
  },

  {
    id: "207",
    image: "./images/image-panna-cotta-mobile.jpg",
    name: "Tiramisu",
    title: "Classic Tiramisu",
    price: 5.0,
    quantity: 1,
  },
];
