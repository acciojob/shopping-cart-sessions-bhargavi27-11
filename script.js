const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
    { id: 4, name: "Product 4", price: 40 },
    { id: 5, name: "Product 5", price: 50 }
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Load cart from sessionStorage
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Display products
function displayProducts() {
    products.forEach(product => {
        const li = document.createElement("li");
        li.textContent = `${product.name} - $${product.price} `;

        const button = document.createElement("button");
        button.textContent = "Add to Cart";
        button.addEventListener("click", () => addToCart(product));

        li.appendChild(button);
        productList.appendChild(li);
    });
}

// Add product to cart
function addToCart(product) {
    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Display cart
function displayCart() {
    cartList.innerHTML = "";

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price}`;
        cartList.appendChild(li);
    });
}

// Clear cart
clearCartBtn.addEventListener("click", () => {
    cart = [];
    sessionStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
});

// Initialize page
displayProducts();
displayCart();