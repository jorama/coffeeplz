import React, { useState, useEffect, useCallback } from 'react';
import placeSearch from './PlaceSearch';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('coffee');

  const fetchPlaces = useCallback(async () => {
    const data = await placeSearch(37.773972, -122.431297, selectedCategory);
    setSearchResults(data);
  }, [selectedCategory]);

  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Kana</h1>
        <div>
          <label htmlFor="category" className="mr-2 font-semibold">
            Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="py-1 px-2 rounded-md border border-gray-300"
          >
            <option value="coffee">Coffee Shops</option>
            <option value="chinese">Chinese Restaurants</option>
            <option value="mexican">Mexican Restaurants</option>
            <option value="indian">Indian Restaurants</option>
            <option value="burgers">Burger Joints</option>
          </select>
        </div>
      </header>
      <h2 className="text-3xl font-bold mb-4">
        {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')} Near You
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchResults.length > 0 ? (
          searchResults.map((place) => (
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
                  {typeof place.rating === 'number' && (
                    <>
                      <span className="mr-2">{place.rating}</span>
                      {Array(Math.floor(place.rating))
                        .fill()
                        .map((_, index) => (
                          <svg
                            key={index}
                            className="h-5 w-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      {place.rating % 1 !== 0 && (
                        <svg
                          className="h-5 w-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </>
                  )}
                </div>
                <p className="text-gray-600 text-sm">
                  {(place.distance / 1000).toFixed(2)} km away
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;