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

// ─── Storage helpers ───
function getCart() {
  const saved = sessionStorage.getItem("cart");
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// ─── Render cart ───
function renderCart() {
  cartList.innerHTML = "";

  const cart = getCart();

  if (cart.length === 0) {
    return;   // IMPORTANT: no <li> when empty → passes .should("be.empty")
  }

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - \[ {item.price}`;   // or ₹ — usually doesn't matter for storage
    cartList.appendChild(li);
  });
}

// ─── Add to cart ───
function addToCart(productId) {
  const product = products.find(p => p.id === Number(productId));
  if (!product) return;

  let cart = getCart();               // ← must read existing cart!
  cart.push({
    id: product.id,
    name: product.name,
    price: product.price
  });

  saveCart(cart);
  renderCart();
}

// ─── Clear cart ───
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// ─── Render products ───
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `\( {product.name} - \]{product.price} <button class="add-to-cart-btn" data-id=" \){product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// ─── Event listeners ───
productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const productId = e.target.dataset.id;
    addToCart(productId);
  }
});

if (clearBtn) {
  clearBtn.addEventListener("click", clearCart);
}

// ─── Initialize ───
renderProducts();
renderCart();     // loads whatever is already in sessionStorage