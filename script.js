// Main JavaScript for e-commerce functionality

// Cart functionality
let cart = [];

// Load cart from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedCart = localStorage.getItem('ecommerceCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartCount();
  }

  // Initialize any product event listeners
  initializeProductListeners();
});

// Initialize product event listeners
function initializeProductListeners() {
  // Add to cart buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', handleAddToCart);
  });
}

// Handle add to cart action
function handleAddToCart(event) {
  const button = event.currentTarget;
  const productId = parseInt(button.getAttribute('data-product-id'));
  const productTitle = button.getAttribute('data-product-title');
  const productPrice = parseFloat(button.getAttribute('data-product-price'));
  const productImage = button.getAttribute('data-product-image');

  // Check if product is already in cart
  const existingItemIndex = cart.findIndex(item => item.id === productId);
  
  if (existingItemIndex >= 0) {
    // Update quantity
    cart[existingItemIndex].quantity += 1;
  } else {
    // Add new item
    cart.push({
      id: productId,
      title: productTitle,
      price: productPrice,
      image: productImage,
      quantity: 1
    });
  }

  // Save cart to localStorage
  saveCart();
  
  // Update UI
  updateCartCount();
  
  // Show confirmation toast
  showToast(`${productTitle} added to cart`);
}

// Update cart count in header
function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = count.toString();
    cartCountElement.classList.toggle('hidden', count === 0);
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('ecommerceCart', JSON.stringify(cart));
}

// Show toast message
function showToast(message) {
  // Create toast if it doesn't exist
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transform translate-y-full opacity-0 transition-all duration-300';
    document.body.appendChild(toast);
  }
  
  // Set message and show
  toast.textContent = message;
  setTimeout(() => {
    toast.classList.remove('translate-y-full', 'opacity-0');
  }, 10);
  
  // Hide after 3 seconds
  setTimeout(() => {
    toast.classList.add('translate-y-full', 'opacity-0');
  }, 3000);
}

// Function to handle product quantity updates
function updateProductQuantity(productId, newQuantity) {
  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex >= 0) {
    if (newQuantity <= 0) {
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].quantity = newQuantity;
    }
    saveCart();
    updateCartCount();
    
    // Update cart page UI if on cart page
    if (window.location.pathname.includes('/cart')) {
      updateCartUI();
    }
  }
}

// Function to remove item from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartCount();
  
  // Update cart page UI if on cart page
  if (window.location.pathname.includes('/cart')) {
    updateCartUI();
  }
}

// Update cart page UI
function updateCartUI() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  
  if (cartItemsContainer) {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<div class="text-center py-8"><p>Your cart is empty</p><a href="/products" class="inline-block mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90">Start Shopping</a></div>';
    } else {
      // Render cart items
      // Implementation would depend on your HTML structure
    }
  }
  
  if (cartTotalElement) {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
  }
}

// Newsletter subscription
function handleNewsletterSubscription(event) {
  event.preventDefault();
  const emailInput = document.querySelector('#newsletter-email');
  if (emailInput && emailInput.value) {
    // In a real application, you'd send this to your server
    console.log('Newsletter subscription:', emailInput.value);
    showToast('Thank you for subscribing!');
    emailInput.value = '';
  }
}

// Initialize newsletter form if it exists
document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.querySelector('#newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubscription);
  }
});
  
  
  