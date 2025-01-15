import { useState, useEffect } from "react";
import { Tabs } from "antd";

export default function RestaurantMenu({ menuData, restaurantInfo }) {
    // Process menu data using the function we created earlier
    const processedMenu = menuData ? processMenuData(menuData) : [];
    console.log("Processed Menu:", processedMenu);

    // State to track the selected category
    const [selectedCategory, setSelectedCategory] = useState(
        processedMenu.length > 0 ? processedMenu[0].category : null
    );

    // Scroll to the selected category when it changes
    useEffect(() => {
        if (selectedCategory) {
            const element = document.getElementById(selectedCategory);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }, [selectedCategory]);

    return (
        <div className="container">
            <div className="foot-types">
                <div className="container foot-type-inner">
                    <div className="toggle-box">
                        <div className="toggle toggle-green">
                            <input type="checkbox" id="mode-toggle" className="toggle__input"/>
                            <label htmlFor="mode-toggle" className="toggle__label"></label>
                        </div>
                    </div>
                    <div className="toggle-box">
                        <div className="toggle toggle-red">
                            <input type="checkbox" id="non-toggle" className="toggle_red__input"/>
                            <label htmlFor="non-toggle" className="toggle_red__label"></label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ant Design Tabs with Custom Styles */}
            <Tabs
                activeKey={selectedCategory}
                onChange={(key) => setSelectedCategory(key)}
                tabPosition="top"
                tabBarStyle={{
                    marginTop: '1rem',
                    marginBottom: '2rem',
                    borderRadius: "8px",
                }}
                tabBarGutter={40} // Add spacing between tabs
            >
                {processedMenu.map((category) => (
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

            {/* Render all menu items */}
            <div className="menu-grid">
                {processedMenu.map((category) => (
                    <div key={category.category} id={category.category}>
                        <h2 style={{ marginBottom: '1rem' }}>
                            {category.category}
                        </h2>
                        <div className="row" style={{ marginBottom: '2rem' }}>
                            {category.items.map((item) => (
                                <div key={item.id} className="col-md-4 item-details" style={{ marginBottom: '1rem', marginRight: '1rem' }}>
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
                                        <div className="item-price">
                                            <p>
                                                <span><sup>₹</sup>{item.price}</span>
                                            </p>
                                            <a href="#">Add</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Menu data processing function
function processMenuData(menuData) {
    console.log("Raw Menu Data:", menuData);

    // Skip the first item and the last two items from menuData
    const filteredMenuData = menuData.slice(1, -2);

    // Process all menu cards in the filteredMenuData
    const processedMenu = filteredMenuData
        .filter(menuItem => {
            // Check if the menu item has either itemCards or categories[0].itemCards
            return (
                menuItem?.card?.card?.itemCards ||
                menuItem?.card?.card?.categories?.[0]?.itemCards
            );
        })
        .flatMap(menuItem => {
            const menuCard = menuItem.card.card;

            // Get itemCards from either the direct path or the nested categories path
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
                        price: item.price / 100, // Convert price from paise to rupees
                        imageId: item.imageId,
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