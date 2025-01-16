'use client';

import { useState, useEffect, useCallback } from 'react';
import { redirect } from 'next/navigation'
import Cookies from 'js-cookie';
import ResturantFilter from "@/app/restaurants/components/ResturantFilter";
import ResturantCard from "@/app/restaurants/components/ResturantCard";
import RestaurantSkeleton from "@/app/restaurants/components/RestaurantSkeleton";

export default function Restaurants() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState(11); // Initial pagination value
    const [hasMore, setHasMore] = useState(true); // Track if more items can be loaded

    const fetchRestaurants = useCallback(async (paginationValue) => {
        const locationData = Cookies.get('locationData');

        if (!locationData) {
            redirect('/')
        }

        try {
            const { location } = JSON.parse(locationData);
            const { lat, lng } = location;

            const response = await fetch(
                `https://skymaxfiber.co.in/fetch/restaurants?lat=${lat}&lng=${lng}&pagination=${paginationValue}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Restaurant response received:', data);

            if (data?.success?.cards?.[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants) {
                const newRestaurants = data.success.cards[0].card.card.gridElements.infoWithStyle.restaurants;

                // If no new restaurants are returned, we've reached the end
                if (newRestaurants.length === 0) {
                    setHasMore(false);
                    return;
                }

                // If this is a new fetch (not loading more), replace the restaurants
                // If loading more, append the new restaurants to existing ones
                setRestaurants(prev =>
                    paginationValue === 11 ? newRestaurants : [...prev, ...newRestaurants]
                );

                localStorage.setItem('restaurantsData', JSON.stringify(
                    paginationValue === 11 ? newRestaurants : [...restaurants, ...newRestaurants]
                ));
            } else {
                setError('No restaurants found in the response.');
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            setError('Failed to fetch restaurants. Please try again.');
        }
    }, [restaurants]);

    // Initial load
    useEffect(() => {
        setLoading(true);
        fetchRestaurants(pagination)
            .finally(() => setLoading(false));
    }, []);

    // Scroll handler
    useEffect(() => {
        const handleScroll = async () => {
            if (
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 500 &&
                !loading &&
                !loadingMore &&
                hasMore
            ) {
                setLoadingMore(true);
                const nextPagination = pagination + 15;
                setPagination(nextPagination);
                await fetchRestaurants(nextPagination);
                setLoadingMore(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pagination, loading, loadingMore, hasMore, fetchRestaurants]);

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

                {loading ? (
                    <RestaurantSkeleton />
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>{error}</div>
                ) : (
                    <>
                        <ResturantCard restaurants={restaurants} />
                        {loadingMore && <RestaurantSkeleton />}
                    </>
                )}
            </main>
        </div>
    );
}