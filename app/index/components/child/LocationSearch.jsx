'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { CircleX } from 'lucide-react';


export default function LocationSearch() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchingLocation, setFetchingLocation] = useState(false);
    const [skipFetch, setSkipFetch] = useState(false);

    // Function to fetch suggestions from the API
    const fetchSuggestions = async (searchQuery) => {
        if (!searchQuery) {
            setSuggestions([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `https://skymaxfiber.co.in/fetch/location?query=${searchQuery}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            if (!Array.isArray(data)) {
                throw new Error('Invalid API response structure: Expected an array');
            }

            setSuggestions(data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    // Handle input change
    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (!skipFetch) {
            // Only fetch if not skipping
            const delayDebounceFn = setTimeout(() => {
                fetchSuggestions(value);
            }, 300);
            return () => clearTimeout(delayDebounceFn);
        }
        setSkipFetch(false); // Reset skip flag
    };

    // Handle suggestion selection
    const handleSuggestionClick = (suggestion) => {
        setSkipFetch(true); // Set flag to skip next fetch
        setQuery(suggestion.description);
        setSuggestions([]); // Clear suggestions
        setLoading(false); // Stop loading state

        const selectedLocation = {
            description: suggestion.description,
            place_id: suggestion.place_id,
        };

        Cookies.set('selectedLocation', JSON.stringify(selectedLocation), { expires: 7 });
        handleEssenFindenClick();
    };

    // Handle clear input
    const handleClearInput = () => {
        setSkipFetch(true); // Set flag to skip next fetch
        setQuery('');
        setSuggestions([]);
        setLoading(false);
    };

    // Handle "Essen Finden" button click
    const handleEssenFindenClick = async () => {
        const selectedLocation = Cookies.get('selectedLocation');

        if (!selectedLocation) {
            alert('No location selected. Please select a location first.');
            return;
        }

        const { place_id } = JSON.parse(selectedLocation);

        setFetchingLocation(true);

        try {
            const locationResponse = await fetch(
                `https://skymaxfiber.co.in/fetch/latlng?place_id=${place_id}`
            );

            if (!locationResponse.ok) {
                throw new Error(`HTTP error! Status: ${locationResponse.status}`);
            }

            const locationData = await locationResponse.json();
            console.log('Fetched Lat and Lng:', locationData);

            const locationCookieData = {
                formatted_address: locationData.formatted_address,
                place_id: locationData.place_id,
                location: {
                    lat: locationData.location.lat,
                    lng: locationData.location.lng,
                },
            };

            Cookies.set('locationData', JSON.stringify(locationCookieData), { expires: 7 });
            console.log('Location data saved to cookie:', locationCookieData);

            router.push("/restaurants");

        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data. Please try again.');
        } finally {
            setFetchingLocation(false);
        }
    };

    // Styling for typing animation
    const typingLoaderStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)'
    };

    const dotStyle = {
        width: '5px',
        height: '5px',
        backgroundColor: '#F55204',
        borderRadius: '50%',
        display: 'inline-block'
    };

    const typingAnimation = {
        animation: 'jump 0.5s infinite alternate'
    };

    const typingAnimationDelayed1 = {
        animation: 'jump 0.5s 0.2s infinite alternate'
    };

    const typingAnimationDelayed2 = {
        animation: 'jump 0.5s 0.4s infinite alternate'
    };

    return (
        <div className="search_field">
            {fetchingLocation && (
                <div className="fullscreen-overlay">
                    <div className="loader-content">
                        <Spin size="large" />
                        <p>Getting Resturants...</p>
                    </div>
                </div>
            )}

            <div className="row">
                <div className="col-md-8">
                    <form
                        className="e-search-form"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div className="e-search-input-wrapper" style={{ position: 'relative' }}>
                            <input
                                id="search-214b6a7"
                                placeholder="Full Address"
                                className="e-search-input"
                                type="text"
                                value={query}
                                onChange={handleInputChange}
                                style={{
                                    "&::-webkit-search-cancel-button": {
                                        display: "none"
                                    },
                                    "&::-webkit-search-decoration": {
                                        display: "none"
                                    }
                                }}
                            />

                            {query && (
                                loading ? (
                                    <div style={typingLoaderStyle}>
                                        <span style={{...dotStyle, ...typingAnimation}}></span>
                                        <span style={{...dotStyle, ...typingAnimationDelayed1}}></span>
                                        <span style={{...dotStyle, ...typingAnimationDelayed2}}></span>
                                    </div>
                                ) : (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            right: '12px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer'
                                        }}
                                        onClick={handleClearInput}
                                    >
                                        <CircleX size={16} />
                                    </div>
                                )
                            )}

                            {!query && (
                                <button className="e-search-submit" type="submit">
                                    <span className="near-me">Search</span>
                                </button>
                            )}

                            {suggestions.length > 0 && (
                                <ul className="suggestions-list">
                                    {suggestions.map((suggestion, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                        >
                                            {suggestion.description}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </form>
                </div>
                <div className="col-md-4">
                    {/*<button*/}
                    {/*    className="banner_button"*/}
                    {/*    onClick={handleEssenFindenClick}*/}
                    {/*    disabled={fetchingLocation}*/}
                    {/*>*/}
                    {/*    <span>Essen Finden</span>*/}
                    {/*</button>*/}
                </div>
            </div>
        </div>
    );
}