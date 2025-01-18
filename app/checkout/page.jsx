'use client';

import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';

export default function Checkout() {
    const [cartItems, setCartItems] = useState([]);
    const paymentFormRef = useRef(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: ''
    });
    const [orderSummary, setOrderSummary] = useState({
        subtotal: 0,
        shipping: 40,
        discount: 0,
        total: 0
    });

    useEffect(() => {
        // Load cart items from localStorage
        const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
        setCartItems(items);

        // Calculate order summary
        const subtotal = items.reduce((sum, item) => {
            const itemPrice = item.finalPrice || item.price;
            return sum + (itemPrice * item.quantity);
        }, 0);

        setOrderSummary({
            subtotal,
            shipping: 40,
            discount: 0,
            total: subtotal + 40
        });

        // Load user data from cookies
        const userData = Cookies.get('userData');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                const [firstName, ...lastNameParts] = user.name.split(' ');
                const lastName = lastNameParts.join(' ');

                setFormData(prevData => ({
                    ...prevData,
                    firstName: firstName || '',
                    lastName: lastName || '',
                    email: user.email || ''
                }));
            } catch (error) {
                console.error('Error parsing user data from cookie:', error);
            }
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form data if needed
        if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email) {
            alert('Please fill in all required fields');
            return;
        }

        // Save order details if needed
        localStorage.setItem('orderDetails', JSON.stringify({
            ...formData,
            orderTotal: orderSummary.total,
            items: cartItems
        }));

        // Set the amount in the payment form
        if (paymentFormRef.current) {
            const amountInput = paymentFormRef.current.querySelector('#output-amount');
            if (amountInput) {
                // Convert the total to the correct format (assuming the total needs to be in paise/cents)
                // Convert the total to rupees without decimal
                const amount = Math.round(parseFloat(orderSummary.total));
                amountInput.value = amount;

                // Submit the payment form
                paymentFormRef.current.submit();
            }
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const formatPrice = (price) => {
        return (price / 1).toFixed(2);
    };

    const renderAddons = (item) => {
        if (!item.selectedAddons || item.selectedAddons.length === 0) return null;

        return (
            <div className="selected-addons text-sm text-gray-600 mt-1">
                {item.selectedAddons.map((addon, index) => (
                    <div key={`${addon.id}-${index}`} className="addon-item">
                        + {addon.name} (₹{formatPrice(addon.price/100)})
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <main>
                {/* Hidden payment form */}
                <form
                    ref={paymentFormRef}
                    className="nasa-payment-form hidden-tag"
                    method="post"
                    noValidate
                    action="https://digimonitor.in/razorpay/api/tatapay/aHR0cDovL2xvY2FsaG9zdC90ZXN0Lw"
                    style={{ display: 'none' }}
                >
                    <input type="hidden" id="output-amount" name="amount" value="499" />
                </form>

                {/* Rest of your existing JSX */}
                <div className="breadcrumb checkout-breadcrumb">
                    <div className="container breadcrumb_inner">
                        <div className="breadcrumb_list">
                            <a href="#"><img className="home-btn" src="./images/Breadcrumb base.png" alt="Home"/></a>
                            <img className="arrow-icon" src="./images/Right Chevron.png" alt="Arrow"/>
                            <p className="current-page-name">Back to bag</p>
                            <a href="#" className="breadcrumb-logo-img logo-img">
                                <img src="./images/Vector-1.png" alt="Logo"/>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="checkout-form-and-details">
                    <div className="container checkout-form-and-details-inner">
                        <div className="row checkout-form-and-details-row">
                            <div className="col-md-7 cehckout-form-wrap">
                                <div className="form-wrap-heading cehckout-form-inner-wrap">
                                    <h3>Checkout</h3>
                                    <p>Complete your purchase with these details</p>
                                </div>
                                <div className="cehckout-form-inner cehckout-form-inner-wrap">
                                    <form id="checkout-form" onSubmit={handleSubmit}>
                                        <div className="form-group form-group-half">
                                            <input
                                                type="text"
                                                name="firstName"
                                                placeholder="First name"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        <div className="form-group form-group-half">
                                            <input
                                                type="text"
                                                name="lastName"
                                                placeholder="Last name"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        <div className="form-group phone-number-wrapper form-group-half">
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Phone number"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        <div className="form-group form-group-half">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email address"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <textarea
                                                name="message"
                                                rows="4"
                                                placeholder="Delivery instructions (optional)"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                            ></textarea>
                                        </div>

                                        <button type="submit" className="submit-btn">
                                            Continue to payment
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className="col-md-5 checkout-details">
                                {cartItems.map((item) => (
                                    <div key={item.cartItemId} className="item-details">
                                        <div className="item-image">
                                            <img
                                                src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover"
                                            />
                                        </div>
                                        <div className="item-title">
                                            <h3>{item.name}</h3>
                                            <div className="item-price">
                                                <p>
                                                    {item.originalPrice && (
                                                        <del>₹{formatPrice(item.originalPrice)}</del>
                                                    )}
                                                    <span>₹{formatPrice(item.finalPrice || item.price)}</span>
                                                </p>
                                            </div>
                                            <p className="qty-text">QTY: <span>{item.quantity}</span></p>
                                            {renderAddons(item)}
                                        </div>
                                    </div>
                                ))}

                                <div className="item-details-list">
                                    <div className="item-details-list-wrap">
                                        <div className="item-list-count">
                                            <h4>Sub Total</h4>
                                            <h3>₹{formatPrice(orderSummary.subtotal)}</h3>
                                        </div>
                                        <div className="item-list-count">
                                            <h4>Shipping</h4>
                                            <h3>₹{formatPrice(orderSummary.shipping)}</h3>
                                        </div>
                                        <div className="item-list-count">
                                            <h4>Discount</h4>
                                            <h3>₹{formatPrice(orderSummary.discount)}</h3>
                                        </div>
                                        <div className="item-list-count item-total-count">
                                            <h4>Order Total</h4>
                                            <h3>₹{formatPrice(orderSummary.total)}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}