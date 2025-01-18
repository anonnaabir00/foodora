// Cart.jsx
import React, { useState, useEffect } from 'react';
import { getCartItems, removeFromCart, updateQuantity } from './cartUtils';

export default function Cart({ onClose, cartUpdated }) {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const items = getCartItems();
        console.log("Cart Items loaded:", items);
        setCartItems(items);
    }, [cartUpdated]);

    const totalPrice = cartItems.reduce((total, item) => {
        const itemPrice = item.finalPrice || item.price;
        return total + (itemPrice * item.quantity);
    }, 0);

    const handleIncreaseQuantity = (item) => {
        const itemId = item.cartItemId || item.id;
        console.log("Increasing quantity for item:", itemId);
        const updatedItems = updateQuantity(itemId, item.quantity + 1);
        setCartItems(updatedItems);
    };

    const handleDecreaseQuantity = (item) => {
        const itemId = item.cartItemId || item.id;
        console.log("Decreasing quantity for item:", itemId);
        if (item.quantity > 1) {
            const updatedItems = updateQuantity(itemId, item.quantity - 1);
            setCartItems(updatedItems);
        }
    };

    const handleRemoveItem = (item) => {
        const itemId = item.cartItemId || item.id;
        console.log("Removing item:", itemId);
        const updatedItems = removeFromCart(itemId);
        setCartItems(updatedItems);
    };

    const formatAddonPrice = (addon) => {
        if (!addon || !addon.price) return '';
        const price = typeof addon.price === 'number' ? addon.price / 100 : addon.price;
        return `₹${price}`;
    };

    const getItemPrice = (item) => {
        return item.finalPrice || item.price;
    };

    const handleCheckout = () => {
        window.location.href = '/checkout';
    };

    return (
        <div className="cart-content">
            {/*<div className="cart-heading">*/}
            {/*    <h3>Your Cart ({cartItems.length})</h3>*/}
            {/*    <p>Review your items before checking out.</p>*/}
            {/*</div>*/}
            <div className="cart-items-list">
                <div className="cart-items-box-wrap">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.cartItemId || item.id} className="cart-items-box">
                                <div className="item-details">
                                    <div className="item-image">
                                        {item.imageId && (
                                            <img
                                                className="arrow-icon"
                                                src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
                                                alt={item.name}
                                            />
                                        )}
                                    </div>
                                    <div className="item-title">
                                        <h3 className="truncate">{item.name}</h3>
                                        {/*{item.selectedAddons && item.selectedAddons.length > 0 && (*/}
                                        {/*    <div className="selected-addons">*/}
                                        {/*        {item.selectedAddons.map((addon, index) => (*/}
                                        {/*            <small*/}
                                        {/*                key={index}*/}
                                        {/*                style={{*/}
                                        {/*                    color: '#666',*/}
                                        {/*                    fontSize: '0.85em',*/}
                                        {/*                    display: 'block',*/}
                                        {/*                    marginTop: '2px'*/}
                                        {/*                }}*/}
                                        {/*            >*/}
                                        {/*                {addon.name} {formatAddonPrice(addon)}*/}
                                        {/*            </small>*/}
                                        {/*        ))}*/}
                                        {/*    </div>*/}
                                        {/*)}*/}
                                        <div className="item-price">
                                            <p><span><sup>₹</sup>{getItemPrice(item)}</span></p>
                                            <div className="qnt-box">
                                                <button
                                                    className="qnt-select-icon"
                                                    onClick={() => handleDecreaseQuantity(item)}
                                                >-
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    className="qnt-select-icon"
                                                    onClick={() => handleIncreaseQuantity(item)}
                                                >+
                                                </button>
                                            </div>
                                            <button
                                                className="trash-icon"
                                                onClick={() => handleRemoveItem(item)}
                                            >
                                                <img src="/images/Trash-can.svg" alt="Remove"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
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
                <button type="button" onClick={handleCheckout} className="submit-btn cart-checkout-btn">Checkout</button>
            </div>
        </div>
    );
}
