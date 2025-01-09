'use client';

import { useState, useEffect } from 'react';

export default function LocationSearch() {
    const [query, setQuery] = useState(''); // State for search input
    const [suggestions, setSuggestions] = useState([]); // State for API suggestions
    const [loading, setLoading] = useState(false); // State for loading indicator

    // Function to fetch suggestions from the API
    const fetchSuggestions = async (searchQuery) => {
        if (!searchQuery) {
            setSuggestions([]); // Clear suggestions if the query is empty
            return;
        }

        setLoading(true); // Show loading indicator
        try {
            const response = await fetch(
                `https://foodora-api-a713.onrender.com/fetch/location?query=${searchQuery}`
            );

            // Check if the response is OK (status code 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Check if the response is an array
            if (!Array.isArray(data)) {
                throw new Error('Invalid API response structure: Expected an array');
            }

            // Set the suggestions directly (no need to map since the response is already in the correct format)
            setSuggestions(data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]); // Clear suggestions on error
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };

    // Debounce the API call to avoid excessive requests
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchSuggestions(query);
        }, 300); // 300ms delay

        return () => clearTimeout(delayDebounceFn); // Cleanup timeout
    }, [query]);

    return (
        <div className="search_field">
            <div className="row">
                <div className="col-md-8">
                    <form
                        className="e-search-form"
                        onSubmit={(e) => e.preventDefault()} // Prevent form submission
                    >
                        <div className="e-search-input-wrapper">
                            <input
                                id="search-214b6a7"
                                placeholder="Deine Adresse, z.B. Mariahilfer Str. 103"
                                className="e-search-input"
                                type="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)} // Update query state
                            />
                            {/* Show loading indicator */}
                            {loading && <span>Loading...</span>}
                            {/* Display suggestions */}
                            {suggestions.length > 0 && (
                                <ul className="suggestions-list">
                                    {suggestions.map((suggestion, index) => (
                                        <li
                                            key={index}
                                            onClick={() => setQuery(suggestion.description)} // Set suggestion as query
                                        >
                                            {suggestion.description} {/* Display description */}
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
                    <a href="#" className="banner_button">
                        <span>Essen Finden</span>
                    </a>
                </div>
            </div>
        </div>
    );
}