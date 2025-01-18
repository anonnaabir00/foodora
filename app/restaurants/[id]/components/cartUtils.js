// cartUtils.js
export const getCartItems = () => {
    try {
        const cartItems = localStorage.getItem('cartItems');
        return cartItems ? JSON.parse(cartItems) : [];
    } catch {
        return [];
    }
};

export const addToCart = (item) => {
    try {
        const cartItems = getCartItems();
        const itemId = item.cartItemId || item.id;

        // Check if item exists (including customizations)
        const existingItem = cartItems.find(cartItem =>
            (item.selectedAddons ? cartItem.cartItemId === itemId : cartItem.id === itemId)
        );

        let updatedItems;
        if (existingItem) {
            // Update quantity if item exists
            updatedItems = cartItems.map(cartItem =>
                (cartItem.cartItemId || cartItem.id) === itemId
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            );
        } else {
            // Add new item
            updatedItems = [...cartItems, { ...item, quantity: 1, cartItemId: itemId }];
        }

        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        return updatedItems;
    } catch (error) {
        console.error('Error adding to cart:', error);
        return [];
    }
};

export const removeFromCart = (itemId) => {
    try {
        const cartItems = getCartItems();
        const updatedItems = cartItems.filter(item =>
            (item.cartItemId || item.id) !== itemId
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        return updatedItems;
    } catch {
        return [];
    }
};

export const updateQuantity = (itemId, newQuantity) => {
    try {
        const cartItems = getCartItems();
        const updatedItems = cartItems.map(item =>
            (item.cartItemId || item.id) === itemId
                ? { ...item, quantity: newQuantity }
                : item
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        return updatedItems;
    } catch {
        return [];
    }
};

export const clearCart = () => {
    localStorage.removeItem('cartItems');
};
