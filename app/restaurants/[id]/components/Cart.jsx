import React, { useState, useEffect } from 'react';
import { getCartItems, removeFromCart, updateQuantity } from './cartUtils';

export default function Cart({ onClose }) {
    const [cartItems, setCartItems] = useState(getCartItems()); // Initialize cart items from cookies
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // Function to handle quantity increase
    const handleIncreaseQuantity = (itemId) => {
        const item = cartItems.find((i) => i.id === itemId);
        if (item) {
            updateQuantity(itemId, item.quantity + 1); // Update quantity in cookies
            setCartItems(getCartItems()); // Refresh cart items from cookies
        }
    };

    // Function to handle quantity decrease
    const handleDecreaseQuantity = (itemId) => {
        const item = cartItems.find((i) => i.id === itemId);
        if (item && item.quantity > 1) {
            updateQuantity(itemId, item.quantity - 1); // Update quantity in cookies
            setCartItems(getCartItems()); // Refresh cart items from cookies
        }
    };

    // Function to handle item removal
    const handleRemoveItem = (itemId) => {
        removeFromCart(itemId); // Remove item from cookies
        setCartItems(getCartItems()); // Refresh cart items from cookies
    };

    return (
        <div className="cart-content">
            <div className="cart-heading">
                <h3>Your Cart ({cartItems.length})</h3>
                <p>Review your items before checking out.</p>
            </div>
            <div className="cart-items-list">
                <div className="cart-items-box-wrap">
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-items-box">
                            <div className="item-details">
                                <div className="item-image">
                                    <img className="arrow-icon" src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`} alt={item.name} />
                                </div>
                                <div className="item-title">
                                    <h3>{item.name}</h3>
                                    <div className="item-price">
                                        <p><span><sup>₹</sup>{item.price}</span></p>
                                        <div className="qnt-box">
                                            <button className="qnt-select-icon" onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button className="qnt-select-icon" onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                                        </div>
                                        <button className="trash-icon" onClick={() => handleRemoveItem(item.id)}>
                                            <img src="/images/Trash-can.svg" alt="Remove" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="promo-code-box">
                    <h4>Promo code</h4>
                    <div className="promo-code-field">
                        <form className="promo-code-form">
                            <input type="text" name="promo-code" id="promo-code" placeholder="Add code" />
                            <button type="submit" className="apply-btn" id="apply-btn">Apply</button>
                        </form>
                    </div>
                </div>
                <div className="item-details-list">
                    <div className="item-details-list-wrap">
                        <div className="item-list-count">
                            <h4>Sub Total</h4>
                            <h3>₹{totalPrice.toFixed(2)}</h3>
                        </div>
                        <div className="item-list-count">
                            <h4>Discount</h4>
                            <h3>₹0.00</h3>
                        </div>
                        <div className="item-list-count item-total-count">
                            <h4>Total</h4>
                            <h3>₹{totalPrice.toFixed(2)}</h3>
                        </div>
                    </div>
                </div>
                <button type="submit" className="submit-btn cart-checkout-btn">Checkout</button>
            </div>
        </div>
    );
}