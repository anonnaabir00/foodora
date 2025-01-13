import { useState } from "react";
import { Tabs } from "antd";

export default function RestaurantMenu({ menuData, restaurantInfo }) {
    // Process menu data using the function we created earlier
    const processedMenu = menuData ? processMenuData(menuData) : [];
    console.log("Processed Menu:", processedMenu);

    // State to track the selected category
    const [selectedCategory, setSelectedCategory] = useState(
        processedMenu.length > 0 ? processedMenu[0].category : null
    );

    // Filter items based on the selected category
    const filteredItems = processedMenu.find(
        (category) => category.category === selectedCategory
    )?.items || [];

    return (
        <div className="container">
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

            {/* Menu Items */}
            <div className="menu-grid row">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <div key={item.id} className="col-md-4 item-details">
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
                                        {/*<del>₹163</del>*/}
                                        <span><sup>₹</sup>{item.price}</span>
                                    </p>
                                    <a href="#">Add</a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No items available for this category.</p>
                )}
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