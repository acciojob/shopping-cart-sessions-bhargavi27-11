// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList     = document.getElementById("cart-list");
const clearBtn     = document.getElementById("clear-cart-btn");

// Helpers
function getCart() {
  const saved = sessionStorage.getItem("cart");
  if (!saved) return [];
  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  cartList.innerHTML = "";

  const cart = getCart();

  if (cart.length === 0) {
    // Do NOT add <li> here → keeps ul empty
    return;
  }

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `\( {item.name} - ₹ \){item.price}`;
    cartList.appendChild(li);
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === Number(productId));
  if (!product) return;

  let cart = getCart();
  cart.push({ id: product.id, name: product.name, price: product.price });

  saveCart(cart);
  renderCart();
}

function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// Render products (your original code is fine)
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Event listeners
productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const id = e.target.getAttribute("data-id");
    addToCart(id);
  }
});

if (clearBtn) {
  clearBtn.addEventListener("click", clearCart);
}

// Init
renderProducts();
renderCart();   // must call → shows persisted cart or empty