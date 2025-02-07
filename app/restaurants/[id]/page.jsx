'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import ResturantMenu from "@/app/restaurants/[id]/components/ResturantMenu";
import MenuSkeleton from "@/app/restaurants/[id]/components/MenuSkeleton";

export default function RestaurantDetail() {
    const params = useParams();
    const router = useRouter();

    // Memoize the restaurantId
    const restaurantId = useMemo(() => params.id, [params.id]);

    const [restaurant, setRestaurant] = useState(null);
    const [menuData, setMenuData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Memoize the fetch function
    const fetchMenuData = useCallback(async () => {
        if (!restaurantId) return;

        try {
            const locationData = Cookies.get('locationData');
            if (!locationData) {
                throw new Error('Location data not found');
            }

            const { location } = JSON.parse(locationData);
            const { lat, lng } = location;

            const menuResponse = await fetch(
                `https://skymaxfiber.co.in/fetch/menu?lat=${lat}&lng=${lng}&restaurantId=${restaurantId}`
            );

            if (!menuResponse.ok) {
                throw new Error('Failed to fetch menu');
            }

            const menuData = await menuResponse.json();

            // Try to find restaurant info in the response
            const restaurantInfo = menuData[2]?.card?.card?.info;
            if (restaurantInfo) {
                setRestaurant({ info: restaurantInfo });
            }

            // Set menu data if available
            const cards = menuData[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
            if (cards) {
                setMenuData(cards);
            }

            if (!restaurantInfo && !cards) {
                throw new Error('Invalid response structure');
            }

        } catch (err) {
            setError('Error loading menu details: ' + err.message);
        } finally {
            setLoading(false);
        }
    }, [restaurantId]);

    // Use effect with memoized fetch function
    useEffect(() => {
        fetchMenuData();
    }, [fetchMenuData]);

    // Memoize the media URL getter
    const getMediaUrl = useCallback(() => {
        if (restaurant?.info?.cloudinaryImageId) {
            return `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/${restaurant.info.cloudinaryImageId}`;
        }
        return '/images/default-restaurant.jpg';
    }, [restaurant?.info?.cloudinaryImageId]);

    if (loading) {
        return <MenuSkeleton />;
    }

    if (error) {
        return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>{error}</div>;
    }

    if (!restaurant) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Restaurant not found</div>;
    }

    return (
        <>
            <div className="food-box">
                <div className="container food-box-inner">
                    <div className="food-content">
                        <div className="col-md-8 food-item">
                            <img
                                className="arrow-icon"
                                src={getMediaUrl()}
                                alt={restaurant.info.name}
                                onError={(e) => {
                                    e.target.src = '/images/default-restaurant.jpg';
                                }}
                            />
                            <div className="brand-name">
                                <h3>{restaurant.info.name}</h3>
                                <p>{Array.isArray(restaurant.info.cuisines)
                                    ? restaurant.info.cuisines.join(', ')
                                    : restaurant.info.cuisines}</p>
                            </div>
                        </div>
                        <div className="col-md-4 food-rank-time">
                            <div className="food-time">
                                <img src="/images/Group.png" alt="Time"/>
                                <p>{restaurant.info.sla?.deliveryTime || '20 - 30'} Mins</p>
                            </div>
                            <div className="food-rank">
                                <div className="food-start-rate">
                                    <img src="/images/Star Rating Icon.png" alt="Rating"/>
                                    <span className="rating-text">
                                        {typeof restaurant.info.avgRating === 'object'
                                            ? restaurant.info.avgRating.value
                                            : restaurant.info.avgRating || 'New'}
                                    </span>
                                </div>
                                <div className="food-use-count">
                                    <img src="/images/User.svg" alt="Users"/>
                                    <p>{restaurant.info.totalRatings || '0'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {menuData && (
                <ResturantMenu menuData={menuData} restaurantInfo={restaurant.info} />
            )}
        </>
    );
}
