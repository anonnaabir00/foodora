'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';
import ResturantCard from "@/app/restaurants/components/ResturantCard";
import RestaurantSkeleton from "@/app/restaurants/components/RestaurantSkeleton";

export default function CollectionPage() {
    const searchParams = useSearchParams();
    const collection_id = searchParams.get('collectionId');
    const tags = searchParams.get('tags');
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!collection_id || !tags) return;

        const fetchRestaurants = async () => {
            const locationData = Cookies.get('locationData');

            if (!locationData) {
                redirect('/');
                return;
            }

            try {
                const { location } = JSON.parse(locationData);
                const { lat, lng } = location;

                setLoading(true);
                const response = await fetch(
                    `http://localhost:4000/fetch/restaurants-by-collection?lat=${lat}&lng=${lng}&collectionId=${collection_id}&tags=${tags}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Raw API response:', data);

                const restaurantCards = data.cards.filter(card =>
                    card.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
                );

                if (!restaurantCards || restaurantCards.length === 0) {
                    throw new Error('No restaurant data found in response');
                }

                const restaurantsList = restaurantCards.map(card => card.card.card.info);
                console.log('Processed restaurants list:', restaurantsList);

                setRestaurants(restaurantsList);
                setError(null);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
                setError(error.message);
                setRestaurants([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, [collection_id, tags]);

    return (
        <div>
            <main>
                <div className="breadcrumb">
                    <div className="container breadcrumb_inner">
                        <div className="breadcrumb_list">
                            <a href="/">
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
                            <p className="current-page-name">
                                Restaurants
                            </p>
                            <img
                                className="arrow-icon"
                                src="/images/Right Chevron.png"
                                alt="chevron"
                            />
                            <p className="current-page-name">
                                {searchParams.get('name') || 'Collection'}
                            </p>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <RestaurantSkeleton />
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
                        <h2>Error loading restaurants</h2>
                        <p>{error}</p>
                    </div>
                ) : (
                    <ResturantCard restaurants={restaurants} />
                )}
            </main>
        </div>
    );
}