import React, { useState, useEffect } from "react";
import { Modal, Radio, Button, Checkbox, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const CustomizeModal = ({ item, visible, onClose, onAddToCart }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState({
        crust: null,
        size: null,
        extras: [],
        toppings: []
    });

    // Reset state when modal opens
    useEffect(() => {
        if (visible) {
            setCurrentStep(1);
            setSelectedOptions({
                crust: null,
                size: null,
                extras: [],
                toppings: []
            });
        }
    }, [visible]);

    const calculateTotalPrice = () => {
        let total = item?.price || 0;

        // Add selected options prices
        Object.values(selectedOptions).forEach(option => {
            if (Array.isArray(option)) {
                // For arrays (extras and toppings)
                option.forEach(item => {
                    total += (item?.price || 0) / 100;
                });
            } else if (option?.price) {
                // For single selections (crust and size)
                total += option.price / 100;
            }
        });

        return total;
    };

    const handleNext = () => {
        if (currentStep === 1 && !selectedOptions.crust) {
            message.error('Please select a crust type');
            return;
        }
        if (currentStep === 2 && !selectedOptions.size) {
            message.error('Please select a size');
            return;
        }
        setCurrentStep(prev => prev + 1);
    };

    const handleAddToCart = () => {
        const customizedItem = {
            ...item,
            selectedOptions,
            finalPrice: calculateTotalPrice(),
            cartItemId: `${item.id}-${Date.now()}`
        };
        onAddToCart(customizedItem);
    };

    // Group addons by type
    const groupedAddons = item?.addons?.reduce((acc, addon) => {
        const type = addon.groupName.toLowerCase();
        if (type.includes('crust')) acc.crusts = addon;
        else if (type.includes('size')) acc.sizes = addon;
        else if (type.includes('extra')) acc.extras = addon;
        else if (type.includes('topping')) acc.toppings = addon;
        return acc;
    }, { crusts: null, sizes: null, extras: null, toppings: null });

    return (
        <Modal
            title={
                <div style={{
                    padding: '16px 24px',
                    borderBottom: '1px solid #f0f0f0',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{
                                fontSize: '20px',
                                fontWeight: '600',
                                marginBottom: '4px'
                            }}>{item?.name} • ₹{calculateTotalPrice().toFixed(2)}</h3>
                            <p style={{
                                fontSize: '14px',
                                color: '#666',
                                margin: '0'
                            }}>Customise as per your taste</p>
                        </div>
                    </div>
                </div>
            }
            open={visible}
            onCancel={onClose}
            width={500}
            style={{
                borderRadius: '8px',
                overflow: 'hidden'
            }}
            footer={
                <div style={{
                    position: 'sticky',
                    bottom: 0,
                    padding: '16px 24px',
                    borderTop: '1px solid #f0f0f0',
                    backgroundColor: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{
                        fontSize: '14px',
                        color: '#666'
                    }}>
                        {currentStep === 3 ? (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ fontSize: '16px', fontWeight: '600', color: '#000' }}>
                                    ₹{calculateTotalPrice().toFixed(2)}
                                </span>
                                <span style={{ marginLeft: '8px', color: '#F55204', cursor: 'pointer', fontSize: '14px' }}>
                                    View Customized Item
                                </span>
                            </div>
                        ) : (
                            `Step ${currentStep}/3`
                        )}
                    </div>
                    <Button
                        type="primary"
                        onClick={currentStep === 3 ? handleAddToCart : handleNext}
                        style={{
                            backgroundColor: '#F55204',
                            border: 'none',
                            borderRadius: '4px',
                            height: '40px',
                            width: '120px'
                        }}
                    >
                        {currentStep === 3 ? 'Add to Cart' : 'Continue'}
                    </Button>
                </div>
            }
            closeIcon={
                <CloseOutlined style={{
                    backgroundColor: '#0F182A',
                    color: '#FFFFFF',
                    padding: '8px',
                    borderRadius: '10px',
                    fontSize: '12px'
                }} />
            }
        >
            <div style={{ padding: '0 24px' }}>
                {currentStep === 1 && groupedAddons.crusts && (
                    <>
                        <h4 style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            marginBottom: '16px'
                        }}>Crust</h4>
                        {groupedAddons.crusts.choices.map((choice) => (
                            <div
                                key={choice.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '12px 0',
                                    borderBottom: '1px solid #f0f0f0'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <img
                                        src={`/images/${choice.isVeg ? "veg" : "non-veg"}-icon.png`}
                                        alt={choice.isVeg ? "veg" : "non-veg"}
                                        style={{ width: '16px', height: '16px' }}
                                    />
                                    <span style={{ fontSize: '14px' }}>{choice.name}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span>₹{(choice.price / 100).toFixed(2)}</span>
                                    <Radio
                                        checked={selectedOptions.crust?.id === choice.id}
                                        onChange={() => setSelectedOptions(prev => ({
                                            ...prev,
                                            crust: choice
                                        }))}
                                    />
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {currentStep === 2 && (
                    <>
                        {selectedOptions.crust && (
                            <div style={{
                                backgroundColor: '#f8f8f8',
                                padding: '12px',
                                borderRadius: '4px',
                                marginBottom: '16px'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{selectedOptions.crust.name}</span>
                                    <span
                                        style={{ color: '#F55204', cursor: 'pointer' }}
                                        onClick={() => setCurrentStep(1)}
                                    >
                                        Change
                                    </span>
                                </div>
                            </div>
                        )}

                        {groupedAddons.sizes && (
                            <>
                                <h4 style={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    marginBottom: '16px'
                                }}>Size</h4>
                                {groupedAddons.sizes.choices.map((choice) => (
                                    <div
                                        key={choice.id}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '12px 0',
                                            borderBottom: '1px solid #f0f0f0'
                                        }}
                                    >
                                        <span style={{ fontSize: '14px' }}>{choice.name}</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <span>₹{(choice.price / 100).toFixed(2)}</span>
                                            <Radio
                                                checked={selectedOptions.size?.id === choice.id}
                                                onChange={() => setSelectedOptions(prev => ({
                                                    ...prev,
                                                    size: choice
                                                }))}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </>
                )}

                {currentStep === 3 && (
                    <>
                        {selectedOptions.size && (
                            <div style={{
                                backgroundColor: '#f8f8f8',
                                padding: '12px',
                                borderRadius: '4px',
                                marginBottom: '16px'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{selectedOptions.size.name}</span>
                                    <span
                                        style={{ color: '#F55204', cursor: 'pointer' }}
                                        onClick={() => setCurrentStep(2)}
                                    >
                                        Change
                                    </span>
                                </div>
                            </div>
                        )}

                        {groupedAddons.extras && (
                            <div style={{ marginBottom: '24px' }}>
                                <h4 style={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    marginBottom: '8px'
                                }}>Extras <span style={{ color: '#666' }}>(optional)</span></h4>
                                {groupedAddons.extras.choices.map((choice) => (
                                    <div
                                        key={choice.id}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '12px 0',
                                            borderBottom: '1px solid #f0f0f0'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <img
                                                src={`/images/${choice.isVeg ? "veg" : "non-veg"}-icon.png`}
                                                alt={choice.isVeg ? "veg" : "non-veg"}
                                                style={{ width: '16px', height: '16px' }}
                                            />
                                            <span>{choice.name}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <span>+₹{(choice.price / 100).toFixed(2)}</span>
                                            <Checkbox
                                                checked={selectedOptions.extras.some(e => e.id === choice.id)}
                                                onChange={(e) => {
                                                    setSelectedOptions(prev => ({
                                                        ...prev,
                                                        extras: e.target.checked
                                                            ? [...prev.extras, choice]
                                                            : prev.extras.filter(extra => extra.id !== choice.id)
                                                    }));
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {groupedAddons.toppings && (
                            <div>
                                <h4 style={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    marginBottom: '8px'
                                }}>Toppings <span style={{ color: '#666' }}>(optional)</span></h4>
                                {groupedAddons.toppings.choices.map((choice) => (
                                    <div
                                        key={choice.id}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '12px 0',
                                            borderBottom: '1px solid #f0f0f0'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <img
                                                src={`/images/${choice.isVeg ? "veg" : "non-veg"}-icon.png`}
                                                alt={choice.isVeg ? "veg" : "non-veg"}
                                                style={{ width: '16px', height: '16px' }}
                                            />
                                            <span>{choice.name}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <span>+₹{(choice.price / 100).toFixed(2)}</span>
                                            <Checkbox
                                                checked={selectedOptions.toppings.some(t => t.id === choice.id)}
                                                onChange={(e) => {
                                                    setSelectedOptions(prev => ({
                                                        ...prev,
                                                        toppings: e.target.checked
                                                            ? [...prev.toppings, choice]
                                                            : prev.toppings.filter(topping => topping.id !== choice.id)
                                                    }));
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </Modal>
    );
};

export default CustomizeModal;
