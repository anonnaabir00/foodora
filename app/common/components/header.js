'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Modal, Drawer } from 'antd'; // Import Ant Design Drawer
import Cookies from 'js-cookie'; // Import js-cookie to manage cookies
import Cart from "@/app/restaurants/[id]/components/Cart";
import Signup from "@/app/common/components/Signup";

export default function Header() {
    const [isCartVisible, setIsCartVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

    // Check if the user is logged in on component mount
    useEffect(() => {
        const userData = Cookies.get('userData');
        if (userData) {
            setIsLoggedIn(true); // Set login state to true if userData exists
        }
    }, []);

    const toggleCart = () => {
        setIsCartVisible((prev) => !prev); // Toggle cart drawer visibility
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        Cookies.remove('userData'); // Remove the userData cookie
        setIsLoggedIn(false); // Update login state
        window.location.href = '/'; // Redirect to the home page
    };

    return (
        <header>
            <div className="header">
                <div className="container">
                    <div className="row">
                        <div className="header_sec">
                            <div className="logo">
                                <Link href="/">
                                    <img src="/images/Vector-1.png" alt="Logo" />
                                </Link>
                            </div>
                            <div className="login_button">
                                {/* Conditionally render buttons based on login state */}
                                {isLoggedIn ? (
                                    <button className="sign_up" onClick={handleLogout}>
                                        Logout
                                    </button>
                                ) : (
                                    <>
                                        <button className="sign_up" onClick={showModal}>Sign Up</button>
                                        <button className="log_in" onClick={showModal}>Log In</button>
                                    </>
                                )}
                                <button className="popup-btn" onClick={toggleCart}>
                                    <img src="/images/cart-button.png" alt="Cart" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ant Design Drawer for Cart */}
            <Drawer
                title={false}
                placement="right"
                onClose={toggleCart} // Close the drawer when clicking outside or pressing ESC
                open={isCartVisible} // Control drawer visibility
                width={450} // Set drawer width
                classNames="cart-drawer"
            >
                <button
                    className="popup-close-btn"
                    onClick={() => setIsCartVisible(false)} // Pass a function to close the drawer
                >
                    <img className="arrow-icon" src="/images/Subtract.svg" alt="Close"/>
                </button>
                <div className="cart-heading">
                    <h3>Your Cart</h3>
                    <p>Review your items before checking out.</p>
                </div>
                <Cart
                    onClose={toggleCart}/> {/* Pass the toggleCart function to close the drawer from inside the Cart */}
            </Drawer>

            {/* Ant Design Modal for Signup/Login */}
            <Modal
                title={null}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={400}
                className="signup-modal"
            >
                <Signup onSuccess={() => setIsLoggedIn(true)} /> {/* Pass a callback to update login state on success */}
            </Modal>
        </header>
    );
}