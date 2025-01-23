import React, { useState, useEffect } from 'react';
import { getCartItems } from './cartUtils';
import { Modal } from 'antd';
import Cart from './Cart';

export default function CartBar({ onClose, cartUpdated }) {
    const [totalItems, setTotalItems] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const cartItems = getCartItems();
        // Change the calculation to count unique items instead of quantities
        const total = cartItems.length; // This will count the number of unique items
        setTotalItems(total);
    }, [cartUpdated]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="bottom-cart-button" onClick={showModal}>
                <div className="container">
                    <div className="row green-cart">
                        <div className="item-value">
                            <img className="arrow-icon" src="/images/Bag 3.svg"/>
                            {totalItems} Items Added
                        </div>
                        <div className="item-cart-text">
                            Cart <img className="arrow-icon" src="/images/Right Icon.svg"/>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                title="Your Cart"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                width={720}
            >
                <Cart cartUpdated={cartUpdated} onClose={handleCancel} />
            </Modal>
        </>
    );
}