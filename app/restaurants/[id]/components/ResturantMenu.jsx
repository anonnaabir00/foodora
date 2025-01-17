import React, { useState, useEffect } from "react";
import { Tabs, Drawer } from "antd";
import { addToCart } from './cartUtils';
import Cart from './Cart';

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
        addToCart(item);
        setIsCartVisible(true);
        setCartUpdated((prev) => !prev);
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

            <Drawer
                title={null}
                placement="right"
                onClose={() => setIsCartVisible(false)}
                visible={isCartVisible}
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
                <Cart onClose={() => setIsCartVisible(false)} key={cartUpdated ? 'updated' : 'not-updated'} />
            </Drawer>
        </div>
    );
}
