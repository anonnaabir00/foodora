import React, { useState, useEffect } from "react";
import { Tabs, Drawer, Modal, Radio, Checkbox, Button } from "antd";
import { addToCart } from './cartUtils';
import Cart from './Cart';

const CustomizeModal = ({ item, visible, onClose, onAddToCart }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [basePrice] = useState(item?.price || item?.defaultPrice || 0);

    // Reset state when modal opens
    useEffect(() => {
        if (visible) {
            setSelectedOptions({});
            setCurrentStep(0);
        }
    }, [visible, item]);

    const handleOptionChange = (group, choice) => {
        const groupId = group.groupId;

        if (group.maxAddons > 1) {
            // Handle multiple selections with checkboxes
            setSelectedOptions(prev => {
                const currentSelections = prev[groupId] || [];
                const isSelected = currentSelections.some(item => item.id === choice.id);

                let newSelections;
                if (isSelected) {
                    // Remove if already selected
                    newSelections = currentSelections.filter(item => item.id !== choice.id);
                } else {
                    // Add if not selected and within maxAddons limit
                    if (currentSelections.length < group.maxAddons) {
                        newSelections = [...currentSelections, choice];
                    } else {
                        return prev; // Don't update if max limit reached
                    }
                }

                return {
                    ...prev,
                    [groupId]: newSelections
                };
            });
        } else {
            // Handle single selection with radio
            setSelectedOptions(prev => ({
                ...prev,
                [groupId]: [choice]
            }));
        }
    };

    const calculateTotalPrice = () => {
        const itemBasePrice = item?.price || item?.defaultPrice || 0; // Use actual item price directly
        const addonsPrice = Object.values(selectedOptions).flat().reduce((total, choice) => {
            return total + (choice?.price || 0) / 100;
        }, 0);
        return (itemBasePrice) + addonsPrice;
    };

    const handleAddToCart = () => {
        const finalPrice = calculateTotalPrice();
        const selectedAddons = Object.values(selectedOptions).flat().filter(Boolean);

        const customizedItem = {
            ...item,
            selectedAddons: selectedAddons,
            finalPrice: finalPrice,
            cartItemId: `${item.id}-${Date.now()}`
        };

        onAddToCart(customizedItem);
        onClose();
    };

    // Dynamic grouping of addons
    const groupedAddons = item?.addons?.reduce((acc, group) => {
        const groupKey = group.groupName; // Use the original group name as key
        acc[groupKey] = acc[groupKey] || [];
        acc[groupKey].push(group);
        return acc;
    }, {});

    // Create steps dynamically with optional sorting
    const stepOrder = {
        'cheese': 1,
        'toppings': 2,
        'meal': 3,
    };

    const steps = Object.values(groupedAddons || {})
        .map(groups => ({
            title: groups[0]?.groupName || '',
            groups: groups,
            sortOrder: (() => {
                const lowercaseTitle = groups[0]?.groupName.toLowerCase();
                for (const [keyword, order] of Object.entries(stepOrder)) {
                    if (lowercaseTitle.includes(keyword)) return order;
                }
                return 999;
            })()
        }))
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .filter(step => step.groups.length > 0);

    const currentStepData = steps[currentStep];

    const isOptionSelected = (groupId, choiceId) => {
        const groupSelections = selectedOptions[groupId] || [];
        return groupSelections.some(item => item.id === choiceId);
    };

    const getSelectedCount = (groupId) => {
        return selectedOptions[groupId]?.length || 0;
    };

    return (
        <Modal
            title={
                <div style={{
                    padding: '16px 24px',
                    borderBottom: '1px solid #f0f0f0',
                }}>
                    <h3 style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '4px'
                    }}>{item?.name}</h3>
                    <p style={{
                        fontSize: '14px',
                        color: '#666',
                        margin: '0'
                    }}>Step {currentStep + 1} of {steps.length}: {currentStepData?.title}</p>
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
                    position: 'relative',
                    bottom: 0,
                    padding: '16px 24px',
                    backgroundColor: 'white',
                    display: 'block',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px'
                    }}>
                        <div style={{
                            fontSize: '16px',
                            fontWeight: '600'
                        }}>
                            ₹{calculateTotalPrice().toFixed(2)}
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {currentStep > 0 && (
                                <Button
                                    onClick={() => setCurrentStep(prev => prev - 1)}
                                    style={{
                                        borderRadius: '4px',
                                        height: '40px'
                                    }}
                                >
                                    Previous
                                </Button>
                            )}
                            {currentStep < steps.length - 1 && (
                                <Button
                                    onClick={() => setCurrentStep(prev => prev + 1)}
                                    style={{
                                        borderRadius: '4px',
                                        height: '40px'
                                    }}
                                >
                                    Next
                                </Button>
                            )}
                        </div>
                    </div>
                    {currentStep === steps.length - 1 && (
                        <Button
                            type="primary"
                            onClick={handleAddToCart}
                            style={{
                                backgroundColor: '#F55204',
                                border: 'none',
                                borderRadius: '4px',
                                height: '40px',
                                width: '120px'
                            }}
                        >
                            Add to Cart
                        </Button>
                    )}
                </div>
            }
            closeIcon={
                <div style={{
                    color: '#0F182A',
                    position: 'relative',
                    right: '16px',
                    top: '16px',
                    fontSize: '25px',
                    cursor: 'pointer'
                }}>
                    ×
                </div>
            }
        >
            <div style={{ padding: '0 24px' }}>
                <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '16px'
                }}>{currentStepData?.title}</h4>
                {currentStepData?.groups.map((group) => (
                    <div key={group.groupId} style={{ marginBottom: '24px' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '8px'
                        }}>
                            <p style={{
                                fontSize: '14px',
                                color: '#666',
                                margin: 0
                            }}>
                                Select {group.maxAddons > 1 ? `up to ${group.maxAddons}` : 'one'} item{group.maxAddons > 1 ? 's' : ''}
                            </p>
                            {group.maxAddons > 1 && (
                                <span style={{
                                    fontSize: '12px',
                                    color: '#666'
                                }}>
                  {getSelectedCount(group.groupId)}/{group.maxAddons} selected
                </span>
                            )}
                        </div>
                        {group.choices?.map((choice) => (
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
                                    {choice.isVeg === 1 && (
                                        <img
                                            src="/images/Vector (2).png"
                                            alt="veg"
                                            style={{ width: '16px', height: '16px' }}
                                        />
                                    )}
                                    <div>
                                        <span style={{ fontSize: '14px' }}>{choice.name}</span>
                                        <span style={{
                                            fontSize: '12px',
                                            color: '#666',
                                            marginLeft: '8px'
                                        }}>
                      ₹{(choice.price / 100).toFixed(2)}
                    </span>
                                    </div>
                                </div>
                                {group.maxAddons > 1 ? (
                                    <Checkbox
                                        checked={isOptionSelected(group.groupId, choice.id)}
                                        onChange={() => handleOptionChange(group, choice)}
                                        disabled={
                                            !isOptionSelected(group.groupId, choice.id) &&
                                            getSelectedCount(group.groupId) >= group.maxAddons
                                        }
                                        style={{
                                            transform: 'scale(1.2)'
                                        }}
                                    />
                                ) : (
                                    <Radio
                                        checked={isOptionSelected(group.groupId, choice.id)}
                                        onChange={() => handleOptionChange(group, choice)}
                                        style={{
                                            transform: 'scale(1.2)'
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </Modal>
    );
};

function processMenuData(menuData) {
    console.log("Raw Menu Data:", menuData);

    const filteredMenuData = menuData.slice(1, -2);

    const processedMenu = filteredMenuData
        .filter(menuItem => {
            return (
                menuItem?.card?.card?.itemCards ||
                menuItem?.card?.card?.categories?.[0]?.itemCards
            );
        })
        .flatMap(menuItem => {
            const menuCard = menuItem.card.card;

            const itemCards =
                menuCard.itemCards ||
                menuCard.categories?.[0]?.itemCards ||
                [];

            return {
                category: menuCard.title || "Uncategorized",
                items: itemCards.map(itemCard => {
                    const item = itemCard.card.info;
                    return {
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        price: item.price / 100 || item.defaultPrice / 100,
                        addons: item.addons || [],
                        imageId: item.imageId,
                        isVeg: item.isVeg,
                        ratings: item.ratings ? {
                            rating: item.ratings.aggregatedRating.rating,
                            ratingCount: item.ratings.aggregatedRating.ratingCount
                        } : null
                    };
                })
            };
        });

    return processedMenu;
}

export default function RestaurantMenu({ menuData, restaurantInfo }) {
    const [isCartVisible, setIsCartVisible] = useState(false);
    const [cartUpdated, setCartUpdated] = useState(false);
    const [showVeg, setShowVeg] = useState(false);
    const [showNonVeg, setShowNonVeg] = useState(false);
    const [customizeModalVisible, setCustomizeModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const processedMenu = menuData ? processMenuData(menuData) : [];
    console.log("Processed Menu:", processedMenu);

    const [selectedCategory, setSelectedCategory] = useState(
        processedMenu.length > 0 ? processedMenu[0].category : null
    );

    useEffect(() => {
        if (selectedCategory) {
            const element = document.getElementById(selectedCategory);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }, [selectedCategory]);

    const handleAddToCart = (item) => {
        if (item.addons && item.addons.length > 0) {
            setSelectedItem(item);
            setCustomizeModalVisible(true);
        } else {
            addToCart(item);
            setIsCartVisible(true);
            setCartUpdated((prev) => !prev);
        }
    };

    const handleCustomizedAddToCart = (customizedItem) => {
        console.log("Before adding to cart:", customizedItem); // Debug log
        addToCart(customizedItem);
        setIsCartVisible(true);
        setCartUpdated(prev => !prev);
        setCustomizeModalVisible(false);
    };

    // Filter items based on veg/non-veg selection
    const getFilteredItems = (items) => {
        if (!showVeg && !showNonVeg) return items; // Show all items if no filter is selected
        return items.filter(item => {
            if (showVeg && !showNonVeg) return item.isVeg === 1;
            if (!showVeg && showNonVeg) return item.isVeg === 0 || item.isVeg === undefined || item.isVeg === null;
            if (showVeg && showNonVeg) return true;
            return false;
        });
    };

    // Filter categories and their items
    const filteredMenu = processedMenu.map(category => ({
        ...category,
        items: getFilteredItems(category.items)
    })).filter(category => category.items.length > 0);

    return (
        <div className="container">
            <div className="foot-types">
                <div className="container foot-type-inner">
                    <div className="toggle-box">
                        <div className="toggle toggle-green">
                            <input
                                type="checkbox"
                                id="mode-toggle"
                                className="toggle__input"
                                checked={showVeg}
                                onChange={(e) => setShowVeg(e.target.checked)}
                            />
                            <label htmlFor="mode-toggle" className="toggle__label"></label>
                        </div>
                    </div>
                    <div className="toggle-box">
                        <div className="toggle toggle-red">
                            <input
                                type="checkbox"
                                id="non-toggle"
                                className="toggle_red__input"
                                checked={showNonVeg}
                                onChange={(e) => setShowNonVeg(e.target.checked)}
                            />
                            <label htmlFor="non-toggle" className="toggle_red__label"></label>
                        </div>
                    </div>
                </div>
            </div>

            <Tabs
                activeKey={selectedCategory}
                onChange={(key) => setSelectedCategory(key)}
                tabPosition="top"
                tabBarStyle={{
                    marginTop: '1rem',
                    marginBottom: '2rem',
                    borderRadius: "8px",
                }}
                tabBarGutter={40}
            >
                {filteredMenu.map((category) => (
                    <Tabs.TabPane
                        tab={
                            <span className="custom-tab">
                                {category.category} ({category.items.length})
                            </span>
                        }
                        key={category.category}
                    />
                ))}
            </Tabs>

            <div className="menu-grid">
                {filteredMenu.map((category) => (
                    <div key={category.category} id={category.category}>
                        <h2 style={{ marginBottom: '1rem' }}>
                            {category.category}
                        </h2>
                        <div className="row" style={{ marginBottom: '2rem' }}>
                            {category.items.map((item) => (
                                <div key={item.id} className="col-md-4 item-details"
                                     style={{marginBottom: '1rem', marginRight: '1rem'}}>
                                    <div className="item-image">
                                        {item.imageId && (
                                            <img
                                                src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
                                                alt={item.name}
                                                className="arrow-icon"
                                            />
                                        )}
                                    </div>
                                    <div className="item-title">
                                        <h3>{item.name}</h3>
                                        {item.isVeg === 1 && <img className="arrow-icon" src="/images/Vector (2).png" alt="veg"/>}
                                        <div className="item-price">
                                            <p>
                                                <span><sup>₹</sup>{item.price}</span>
                                            </p>
                                            <a href="#" onClick={(e) => {
                                                e.preventDefault();
                                                handleAddToCart(item);
                                            }}>Add</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <CustomizeModal
                item={selectedItem}
                visible={customizeModalVisible}
                onClose={() => setCustomizeModalVisible(false)}
                onAddToCart={handleCustomizedAddToCart}
            />

            <Drawer
                title={null}
                placement="right"
                onClose={() => setIsCartVisible(false)}
                open={isCartVisible}
                width={400}
                extra={
                    <button
                        onClick={() => setIsCartVisible(false)}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px',
                            color: '#000',
                        }}
                    >
                        Close
                    </button>
                }
            >
                {/*<Cart onClose={() => setIsCartVisible(false)} key={cartUpdated ? 'updated' : 'not-updated'} />*/}
                <Cart
                    onClose={() => setIsCartVisible(false)}
                    cartUpdated={cartUpdated}
                />
            </Drawer>
        </div>
    );
}
