import React, { useState, useEffect } from 'react';
import {
    getCartItems,
    removeFromCart,
    updateQuantity,
    saveDiscountState,
    getDiscountState,
    clearDiscountState
} from './cartUtils';

export default function Cart({ onClose, cartUpdated, onCustomizeItem }) {
    const [cartItems, setCartItems] = useState([]);
    const [discount, setDiscount] = useState(0);

    // Calculate total price before discount
    const totalPriceBeforeDiscount = cartItems.reduce((total, item) => {
        const itemPrice = item.finalPrice || item.price;
        return total + (itemPrice * item.quantity);
    }, 0);

    // Calculate final price with automatic discount
    const calculateFinalPrice = () => {
        if (totalPriceBeforeDiscount === 0) return 0;

        if (totalPriceBeforeDiscount < 500) {
            return 75;
        } else {
            const remainder = totalPriceBeforeDiscount - 500;
            return 75 + remainder;
        }
    };

    // Calculate and update discount
    const updateDiscount = () => {
        const finalPrice = calculateFinalPrice();
        const discountAmount = totalPriceBeforeDiscount - finalPrice;
        setDiscount(discountAmount);
        saveDiscountState(true, discountAmount);
    };

    const totalPriceAfterDiscount = calculateFinalPrice();

    useEffect(() => {
        const items = getCartItems();
        setCartItems(items);

        if (items.length > 0) {
            updateDiscount();
        } else {
            setDiscount(0);
            clearDiscountState();
        }
    }, [cartUpdated]);

    const handleIncreaseQuantity = (item) => {
        const itemId = item.cartItemId || item.id;
        const updatedItems = updateQuantity(itemId, item.quantity + 1);
        setCartItems(updatedItems);
        updateDiscount();
    };

    const handleDecreaseQuantity = (item) => {
        const itemId = item.cartItemId || item.id;
        if (item.quantity > 1) {
            const updatedItems = updateQuantity(itemId, item.quantity - 1);
            setCartItems(updatedItems);
            updateDiscount();
        }
    };

    const handleRemoveItem = (item) => {
        const itemId = item.cartItemId || item.id;
        const updatedItems = removeFromCart(itemId);
        setCartItems(updatedItems);
        if (updatedItems.length === 0) {
            setDiscount(0);
            clearDiscountState();
        } else {
            updateDiscount();
        }
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

    const handleCustomize = (item) => {
        if (onCustomizeItem) {
            onCustomizeItem(item);
        }
    };

    return (
        <div className="cart-content">
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
                                        {item.selectedAddons && item.selectedAddons.length > 0 && (
                                            <div className="selected-addons">
                                                {item.selectedAddons.map((addon, index) => (
                                                    <small
                                                        key={index}
                                                        className="addon-item"
                                                    >
                                                        {addon.name} {formatAddonPrice(addon)}
                                                    </small>
                                                ))}
                                            </div>
                                        )}
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
                                            {item.addons && item.addons.length > 0 && (
                                                <button
                                                    className="customize-btn"
                                                    onClick={() => handleCustomize(item)}
                                                >
                                                    Customize
                                                </button>
                                            )}
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
                <div className="item-details-list">
                    <div className="item-details-list-wrap">
                        <div className="item-list-count">
                            <h4>Sub Total</h4>
                            <h3>₹{totalPriceBeforeDiscount.toFixed(2)}</h3>
                        </div>
                        {discount > 0 && (
                            <div className="item-list-count discount-row">
                                <h4>Discount Applied</h4>
                                <h3>-₹{discount.toFixed(2)}</h3>
                            </div>
                        )}
                        <div className="item-list-count item-total-count">
                            <h4>Total</h4>
                            <h3>₹{totalPriceAfterDiscount.toFixed(2)}</h3>
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleCheckout}
                    className="submit-btn cart-checkout-btn"
                    disabled={cartItems.length === 0}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
}
