'use client';

import Link from 'next/link';

export default function RestaurantCard({ restaurants }) {
    // Add console log to check the data structure
    console.log('Received restaurants data:', restaurants);

    if (!restaurants || restaurants.length === 0) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>No restaurants found.</div>;
    }

    // Check if restaurants is nested in info property
    const restaurantList = restaurants.map(restaurant => restaurant.info || restaurant);

    return (
        <div className="recommended-section">
            <div className="container recommended-section-inner">
                <h2 className="recommended-heading">Recommended for you</h2>
                <div className="row recommended-list-boxs">
                    {restaurantList.map((restaurant) => {
                        return (
                            <div className="col-md-4 recommended-box" key={restaurant.id}>
                                <Link href={`/restaurants/${restaurant.id}`}>
                                {/* Restaurant Image */}
                                {restaurant.cloudinaryImageId && (
                                    <img
                                        className="restaurant-img"
                                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/${restaurant.cloudinaryImageId}`}
                                        alt={restaurant.name || 'Restaurant Image'}
                                        style={{
                                            width: '100%',
                                            height: '150px',
                                            objectFit: 'cover',
                                            borderRadius: '10px 10px 0 0',
                                        }}
                                    />
                                )}

                                {/*/!* Discount Information *!/*/}
                                {/*{restaurant.aggregatedDiscountInfoV3?.header && (*/}
                                {/*    <div className="discount-text">*/}
                                {/*        <img src="/images/percentage-icon.png" alt="Discount Icon" />*/}
                                {/*        <p>*/}
                                {/*            {`${restaurant.aggregatedDiscountInfoV3.header} ${*/}
                                {/*                restaurant.aggregatedDiscountInfoV3.subHeader || ''*/}
                                {/*            }`}*/}
                                {/*        </p>*/}
                                {/*    </div>*/}
                                {/*)}*/}


                                {/* Discount Information */}

                                    <div className="discount-text">
                                        <img src="/images/percentage-icon.png" alt="Discount Icon" />
                                        <p>12% off for today</p>
                                    </div>

                                <div className="inner-details-section">
                                    <div className="restaurant-name-detail row">
                                        <div className="col-md-9">
                                            <h3 className="restaurant-name truncate">
                                                {restaurant.name || 'Restaurant Name'}
                                            </h3>
                                            <p className="restaurant-address truncate">
                                                {restaurant.areaName}
                                                {/*{restaurant.locality}*/}
                                                {/*{Array.isArray(restaurant.cuisines)*/}
                                                {/*    ? restaurant.cuisines.join(', ')*/}
                                                {/*    : 'Cuisine information not available'}*/}
                                            </p>
                                            {/*<p className="restaurant-area">*/}
                                            {/*    {[restaurant.areaName, restaurant.locality]*/}
                                            {/*        .filter(Boolean)*/}
                                            {/*        .join(', ') || 'Location not available'}*/}
                                            {/*</p>*/}
                                        </div>
                                        <div className="col-md-3 start-rating">
                                            <img src="/images/Star Rating Icon.png" alt="Star Rating" />
                                            <span className="rating-number">{restaurant.avgRatingString || 'New'}</span>
                                        </div>
                                    </div>

                                    <div className="row restaurant-duration-wrap">
                                        <div className="col-md-9">
                                            {/* Delivery Time */}
                                            {restaurant.sla && (
                                                <div className="time">
                                                    <img src="/images/Group.png" alt="Time Icon" />
                                                    <p>{restaurant.sla.slaString || 'Delivery time not available'}</p>
                                                </div>
                                            )}
                                            {/* Cost Information */}
                                            {/*<div className="price">*/}
                                            {/*    <p>{restaurant.costForTwo || 'Price not available'}</p>*/}
                                            {/*</div>*/}
                                        </div>
                                        <div className="col-md-3">
                                            <Link
                                                href={`/restaurants/${restaurant.id}`}
                                                className="view-botton"
                                            >
                                                View <img src="/images/Right.png"/>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* External Ratings */}
                                    {/*{restaurant.externalRatings?.aggregatedRating && (*/}
                                    {/*    <div className="external-ratings">*/}
                                    {/*        {restaurant.externalRatings.sourceIconImageId && (*/}
                                    {/*            <img*/}
                                    {/*                src={`https://media-assets.swiggy.com/swiggy/image/upload/${restaurant.externalRatings.sourceIconImageId}`}*/}
                                    {/*                alt={restaurant.externalRatings.source || 'Rating Source'}*/}
                                    {/*                className="rating-source-icon"*/}
                                    {/*            />*/}
                                    {/*        )}*/}
                                    {/*        <span>{restaurant.externalRatings.aggregatedRating.rating} </span>*/}
                                    {/*        <span className="rating-count">*/}
                                    {/*            ({restaurant.externalRatings.aggregatedRating.ratingCount} ratings)*/}
                                    {/*        </span>*/}
                                    {/*    </div>*/}
                                    {/*)}*/}

                                </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
