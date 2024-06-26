import React, { useState, useEffect } from 'react';
import placeSearch from './PlaceSearch';

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const fetchPlaces = async () => {
    const data = await placeSearch();
    setSearchResults(data);
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-4">Coffee Shops Near You</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchResults.map((place) => (
          <div
            key={place.fsq_id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{place.name}</h2>
              <p className="text-gray-600 mb-2">
                {place.location.address},<br />
                {place.location.locality}, {place.location.region}{' '}
                {place.location.postcode}
              </p>
              <div className="flex items-center mb-2">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-2">{place.rating}</span>
              </div>
              <p className="text-gray-600 text-sm">
                {(place.distance / 1000).toFixed(2)} km away
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;