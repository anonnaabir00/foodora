'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
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
    const [hasMore, setHasMore] = useState(true);
    const [currentOffsetIndex, setCurrentOffsetIndex] = useState(0);

    // Define the sequence of widgetOffset values from 8 to 100, incrementing by 1
    const offsetSequence = Array.from({ length: 93 }, (_, i) => i + 8);

    const fetchRestaurants = useCallback(async (widgetOffset) => {
        const locationData = Cookies.get('locationData');

        if (!locationData) {
            redirect('/');
            return;
        }

        try {
            const { location } = JSON.parse(locationData);
            const { lat, lng } = location;

            const response = await fetch(
                `https://skymaxfiber.co.in/fetch/restaurants-by-collection?lat=${lat}&lng=${lng}&collectionId=${collection_id}&tags=${tags}&widgetOffset=${widgetOffset}`,
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
                setHasMore(false);
                if (currentOffsetIndex === 0) {
                    throw new Error('No restaurant data found in response');
                }
                return;
            }

            const restaurantsList = restaurantCards.map(card => card.card.card.info);
            console.log('Processed restaurants list:', restaurantsList);

            setRestaurants(prev => {
                // Create a new Set with all restaurant IDs to remove duplicates
                const existingIds = new Set(prev.map(r => r.id));
                const uniqueNewRestaurants = restaurantsList.filter(r => !existingIds.has(r.id));
                return [...prev, ...uniqueNewRestaurants];
            });

            setError(null);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            setError(error.message);
            if (currentOffsetIndex === 0) {
                setRestaurants([]);
            }
        } finally {
            setLoading(false);
        }
    }, [collection_id, tags, currentOffsetIndex]);

    // Initial load
    useEffect(() => {
        if (!collection_id || !tags) return;
        setLoading(true);
        fetchRestaurants(offsetSequence[0]);
    }, [collection_id, tags, fetchRestaurants]);

    // Infinite scroll handler
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop
                === document.documentElement.offsetHeight
            ) {
                if (!loading && hasMore && currentOffsetIndex < offsetSequence.length - 1) {
                    setLoading(true);
                    setCurrentOffsetIndex(prev => prev + 1);
                    fetchRestaurants(offsetSequence[currentOffsetIndex + 1]);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore, currentOffsetIndex, fetchRestaurants]);

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

                <ResturantCard restaurants={restaurants} />

                {loading && <RestaurantSkeleton />}

                {error && currentOffsetIndex === 0 && (
                    <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
                        <h2>Error loading restaurants</h2>
                        <p>{error}</p>
                    </div>
                )}

                {!hasMore && !loading && restaurants.length > 0 && (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <p>No more restaurants to load</p>
                    </div>
                )}
            </main>
        </div>
    );
}