import Cookies from 'js-cookie';

const CART_KEY = 'cart';

// Get cart items from cookies
export const getCartItems = () => {
    const cartItems = Cookies.get(CART_KEY);
    return cartItems ? JSON.parse(cartItems) : [];
};

// Add or update an item in the cart
export const addToCart = (item) => {
    const cartItems = getCartItems();
    const existingItem = cartItems.find((i) => i.id === item.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ ...item, quantity: 1 });
    }

    Cookies.set(CART_KEY, JSON.stringify(cartItems));
};

// Remove an item from the cart
export const removeFromCart = (itemId) => {
    const cartItems = getCartItems().filter((i) => i.id !== itemId);
    Cookies.set(CART_KEY, JSON.stringify(cartItems));
};

// Update the quantity of an item in the cart
export const updateQuantity = (itemId, quantity) => {
    const cartItems = getCartItems().map((i) =>
        i.id === itemId ? { ...i, quantity: Math.max(1, quantity) } : i
    );
    Cookies.set(CART_KEY, JSON.stringify(cartItems));
};

// Clear the cart
export const clearCart = () => {
    Cookies.remove(CART_KEY);
};