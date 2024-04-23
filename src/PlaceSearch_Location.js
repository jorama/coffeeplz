// PlaceSearch.js
import React, { useState } from 'react';
import { getCoordinatesFromAddress } from './geocoding';

async function placeSearch(latitude, longitude, category) {
  // ... (keep the existing placeSearch function implementation)
}

function calculateDistance(coordinates, targetLatitude, targetLongitude) {
  // ... (keep the existing calculateDistance function implementation)
}

function PlaceSearch() {
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('restaurant');
  const [restaurants, setRestaurants] = useState([]);

  const handleSearch = async () => {
    try {
      const coordinates = await getCoordinatesFromAddress(address);
      if (coordinates) {
        const { latitude, longitude } = coordinates;
        const nearbyRestaurants = await placeSearch(latitude, longitude, category);
        setRestaurants(nearbyRestaurants);
      } else {
        console.log('Unable to retrieve coordinates for the address');
      }
    } catch (error) {
      console.error('Error searching for restaurants:', error);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="restaurant">Restaurant</option>
          <option value="cafe">Cafe</option>
          <option value="bar">Bar</option>
          {/* Add more category options as needed */}
        </select>

        <label htmlFor="address">Location Address:</label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter location address"
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      <h2>Nearby Restaurants:</h2>
      {restaurants.length > 0 ? (
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant.fsq_id}>
              {restaurant.name} - Distance: {restaurant.distance} meters
            </li>
          ))}
        </ul>
      ) : (
        <p>No restaurants found.</p>
      )}
    </div>
  );
}

export default PlaceSearch;