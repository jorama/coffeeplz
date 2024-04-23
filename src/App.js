import React, { useState } from 'react';
import PlacesSearch from './PlacesSearch';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');

  const handlePlacesUpdate = (places) => {
    setSearchResults(places);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-4">Places Search</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={handleAddressChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
      <select
  value={category}
  onChange={handleCategoryChange}
  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="">Select category</option>
  <option value="13032">Coffee Shop</option>
  <option value="13236">Italian Restaurant</option>
  <option value="13065">American Restaurant</option>
  <option value="13149">Asian Restaurant</option>
  <option value="13307">Mexican Restaurant</option>
  <option value="13064">Pizza Place</option>
  <option value="13304">Sandwich Place</option>
  <option value="13031">Burger Joint</option>
  <option value="13263">Sushi Restaurant</option>
  <option value="13060">Bakery</option>
</select>
      </div>
      <PlacesSearch address={address} category={category} onPlacesUpdate={handlePlacesUpdate} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchResults.map((place) => (
          <div key={place.fsq_id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              {place.photos && place.photos.length > 0 ? (
                <img
                  src={place.photos[0]}
                  alt={place.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200"></div>
              )}
              <div className="absolute top-0 right-0 m-2 bg-white px-2 py-1 rounded-md text-sm font-semibold">
                {place.category}
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{place.name}</h2>
              <p className="text-gray-600 mb-2">
                {place.location.formatted_address}
              </p>
              <div className="flex items-center mb-2">
                <span className="text-yellow-500">&#9733;</span>
                <span className="ml-1">{place.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;