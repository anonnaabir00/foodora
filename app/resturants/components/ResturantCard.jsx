'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Spin } from 'antd'; // Import Spin from antd

export default function RestaurantCard() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch location data from the cookie and then fetch restaurants based on lat and lng
    useEffect(() => {
        const fetchRestaurants = async () => {
            const locationData = Cookies.get('locationData');

            if (!locationData) {
                setError('No location data found. Please select a location first.');
                setLoading(false);
                return;
            }

            try {
                const { location } = JSON.parse(locationData);
                const { lat, lng } = location;

                // Fetch restaurants using lat and lng
                const response = await fetch(
                    `https://foodora-api-a713.onrender.com/fetch/restaurants?lat=${lat}&lng=${lng}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Restaurant response received:', data);

                // Extract restaurants from the response (adjust this based on your API response structure)
                if (data?.success?.cards?.[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants) {
                    const restaurants = data.success.cards[0].card.card.gridElements.infoWithStyle.restaurants;
                    setRestaurants(restaurants);
                } else {
                    setError('No restaurants found in the response.');
                }
            } catch (error) {
                console.error('Error fetching restaurants:', error);
                setError('Failed to fetch restaurants. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" tip="Loading restaurants..." />
            </div>
        );
    }

    if (error) {
        return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>{error}</div>;
    }

    if (restaurants.length === 0) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>No restaurants found.</div>;
    }

    return (
        <div className="recommended-section">
            <div className="container recommended-section-inner">
                <h2 className="recommended-heading">Recommended for you</h2>
                <div className="row recommended-list-boxs">
                    {/* Loop through restaurants and render cards */}
                    {restaurants.map((restaurant) => (
                        <div className="col-md-4 recommended-box" key={restaurant.info.id}>
                            <img
                                className="restaurant-img"
                                src={restaurant.info.mediaFiles || './images/default-restaurant.png'} // Fallback image if mediaFiles is not available
                                alt={restaurant.info.name}
                            />
                            <div className="discount-text">
                                <img src="./images/percentage-icon.png" alt="Discount Icon" />
                                <p>12% off for today</p> {/* You can dynamically set this if available in the data */}
                            </div>
                            <div className="inner-details-section">
                                <div className="restaurant-name-detail row">
                                    <div className="col-md-9">
                                        <h3 className="restaurant-name">{restaurant.info.name}</h3>
                                        <p className="restaurant-address">
                                            {Array.isArray(restaurant.info.cuisines)
                                                ? restaurant.info.cuisines.join(', ')
                                                : restaurant.info.cuisines}
                                        </p>
                                    </div>
                                    <div className="col-md-3 start-rating">
                                        <img src="./images/Star Rating Icon.png" alt="Star Rating" />
                                        <span>
                                            {typeof restaurant.info.rating === 'object'
                                                ? restaurant.info.rating.value // Handle object rating
                                                : restaurant.info.rating}
                                        </span>
                                    </div>
                                </div>
                                <div className="row restaurant-duration-wrap">
                                    <div className="col-md-9">
                                        <div className="time">
                                            <img src="./images/Group.png" alt="Time Icon" />
                                            <p>20 - 30 Minutes</p> {/* You can dynamically set this if available in the data */}
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <a href="#" className="view-botton">
                                            View <img src="./images/Right.png" alt="View Icon" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}