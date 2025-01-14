'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Spin } from 'antd';
import ResturantFilter from "@/app/restaurants/components/ResturantFilter";
import ResturantCard from "@/app/restaurants/components/ResturantCard";

export default function Restaurants() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

                const response = await fetch(
                    `https://skymaxfiber.co.in/fetch/restaurants?lat=${lat}&lng=${lng}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Restaurant response received:', data);

                if (data?.success?.cards?.[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants) {
                    const restaurantsData = data.success.cards[0].card.card.gridElements.infoWithStyle.restaurants;
                    setRestaurants(restaurantsData);
                    // Store in local storage
                    localStorage.setItem('restaurantsData', JSON.stringify(restaurantsData));
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

    return (
        <div>
            <main>
                <div className="breadcrumb">
                    <div className="container breadcrumb_inner">
                        <div className="breadcrumb_list">
                            <a href="#">
                                <img
                                    className="home-btn"
                                    src="/images/Breadcrumb base.png"
                                    alt="Home"
                                />
                            </a>
                            <img
                                className="arrow-icon"
                                src="/images/Right Chevron.png"
                                alt="chevron"
                            />
                            <p className="current-page-name">Find Restaurants</p>
                        </div>
                    </div>
                </div>

                <ResturantFilter />
                <ResturantCard restaurants={restaurants} />
            </main>
        </div>
    );
}