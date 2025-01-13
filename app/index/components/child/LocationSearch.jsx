'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';

export default function LocationSearch() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchingLocation, setFetchingLocation] = useState(false);

    // Function to fetch suggestions from the API
    const fetchSuggestions = async (searchQuery) => {
        if (!searchQuery) {
            setSuggestions([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `https://foodora-api-a713.onrender.com/fetch/location?query=${searchQuery}`
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

    // Debounce the API call
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchSuggestions(query);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    // Handle suggestion selection
    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion.description);
        console.log('Selected Suggestion:', suggestion);

        const selectedLocation = {
            description: suggestion.description,
            place_id: suggestion.place_id,
        };

        Cookies.set('selectedLocation', JSON.stringify(selectedLocation), { expires: 7 });
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
            // Step 1: Fetch lat and lng using place_id
            const locationResponse = await fetch(
                `https://foodora-api-a713.onrender.com/fetch/latlng?place_id=${place_id}`
            );

            if (!locationResponse.ok) {
                throw new Error(`HTTP error! Status: ${locationResponse.status}`);
            }

            const locationData = await locationResponse.json();
            console.log('Fetched Lat and Lng:', locationData);

            // Save location data to cookie
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

            // Redirect immediately after setting the cookie
            router.push("/restaurants");

        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data. Please try again.');
        } finally {
            setFetchingLocation(false);
        }
    };

    return (
        <div className="search_field">
            {fetchingLocation && (
                <div className="fullscreen-overlay">
                    <div className="loader-content">
                        <Spin size="large" />
                        <p>Getting Location...</p>
                    </div>
                </div>
            )}

            <div className="row">
                <div className="col-md-8">
                    <form
                        className="e-search-form"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div className="e-search-input-wrapper">
                            <input
                                id="search-214b6a7"
                                placeholder="Deine Adresse, z.B. Mariahilfer Str. 103"
                                className="e-search-input"
                                type="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            {loading && <span>Loading...</span>}

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
                        <button className="e-search-submit" type="submit">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                            >
                                <path
                                    d="M11.3898 1.09226C12.328 0.779557 13.2204 1.67204 12.9077 2.61015L10.0734 11.1133C9.74497 12.0985 8.40512 12.2297 7.8918 11.327L6.40778 8.71715C6.14087 8.24775 5.75221 7.85909 5.28281 7.59218L2.67304 6.1082C1.77031 5.59488 1.90155 4.25502 2.88673 3.92663L11.3898 1.09226Z"
                                    stroke="#0F172A"
                                    strokeWidth="1.5"
                                />
                                <path
                                    d="M7.52382 6.47621L6.19049 7.80955"
                                    stroke="#0F172A"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span>Near Me</span>
                        </button>
                    </form>
                </div>
                <div className="col-md-4">
                    <button
                        className="banner_button"
                        onClick={handleEssenFindenClick}
                        disabled={fetchingLocation}
                    >
                        <span>Essen Finden</span>
                    </button>
                </div>
            </div>
        </div>
    );
}