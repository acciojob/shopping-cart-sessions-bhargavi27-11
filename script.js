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

// ────────────────────────────────────────────────
// Helper functions for sessionStorage
// ────────────────────────────────────────────────

function getCart() {
  const saved = sessionStorage.getItem("cart");
  return saved ? JSON.parse(saved) : [];
}

function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// ────────────────────────────────────────────────
// Render cart list
// ────────────────────────────────────────────────

function renderCart() {
  cartList.innerHTML = ""; // clear previous content

  const cart = getCart();

  if (cart.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Cart is empty";
    cartList.appendChild(li);
    return;
  }

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `\( {item.name} - ₹ \){item.price}`;
    cartList.appendChild(li);
  });
}

// ────────────────────────────────────────────────
// Add item to cart
// ────────────────────────────────────────────────

function addToCart(productId) {
  // Find the product by id
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Get current cart and add the item (allowing duplicates)
  let cart = getCart();
  cart.push(product);

  saveCart(cart);
  renderCart();
}

// ────────────────────────────────────────────────
// Remove item from cart
// (optional – many test cases don't require it, but included for safety)
// ────────────────────────────────────────────────

function removeFromCart(productId) {
  let cart = getCart();
  // Remove first occurrence only
  const index = cart.findIndex(item => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
  }
}

// ────────────────────────────────────────────────
// Clear cart
// ────────────────────────────────────────────────

function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// ────────────────────────────────────────────────
// Render product list (already partially given)
// ────────────────────────────────────────────────

function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `\( {product.name} - ₹ \){product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// ────────────────────────────────────────────────
// Event listeners
// ────────────────────────────────────────────────

productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const productId = Number(e.target.dataset.id);
    addToCart(productId);
  }
});

if (clearBtn) {
  clearBtn.addEventListener("click", clearCart);
}

// ────────────────────────────────────────────────
// Initial render
// ────────────────────────────────────────────────

renderProducts();
renderCart();           // important – loads persisted cart