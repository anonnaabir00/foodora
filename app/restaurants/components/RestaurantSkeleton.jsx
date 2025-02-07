'use client';

import { Skeleton } from 'antd';
import { useState, useEffect } from 'react';

const RestaurantSkeleton = () => {
    const [width, setWidth] = useState('400px'); // Default desktop width

    useEffect(() => {
        // Function to update width based on window size
        const updateWidth = () => {
            setWidth(window.innerWidth < 768 ? '340px' : '400px');
        };

        // Set initial width
        updateWidth();

        // Add event listener for window resize
        window.addEventListener('resize', updateWidth);

        // Cleanup
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    return (
        <div className="recommended-section">
            <div className="container recommended-section-inner">
                <div className="row recommended-list-boxs">
                    {[1, 2, 3, 4, 5, 6].map((index) => (
                        <div className="col-md-4 recommended-box" key={index}>
                            <Skeleton.Image
                                active
                                style={{
                                    minWidth: width,
                                    height: 150,
                                    borderRadius: '10px 10px 0 0'
                                }}
                            />

                            <div className="inner-details-section">
                                {/* Restaurant Name & Rating */}
                                <div className="restaurant-name-detail row">
                                    <div className="col-md-9">
                                        <Skeleton
                                            active
                                            paragraph={{rows: 2, width: ['80%', '60%']}}
                                            title={false}
                                        />
                                    </div>
                                    <div className="col-md-3 start-rating">
                                        <Skeleton.Button
                                            active
                                            style={{
                                                width: 45,
                                                height: 24
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Delivery Time & View Button */}
                                <div className="row restaurant-duration-wrap">
                                    <div className="col-md-9">
                                        <Skeleton.Button
                                            active
                                            style={{
                                                width: '40%',
                                                height: 24
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <Skeleton.Button
                                            active
                                            style={{
                                                width: '100%',
                                                height: 32,
                                                borderRadius: 16
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RestaurantSkeleton;