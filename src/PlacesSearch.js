import React, { useState } from 'react';
import axios from 'axios';

const PlacesSearch = ({ address, category, onPlacesUpdate }) => {
  const [places, setPlaces] = useState([]);

  const handleSearch = async () => {
    try {
      const searchParams = new URLSearchParams({
        near: address,
        categories: category,
        open_now: 'true',
        sort: 'DISTANCE',
      });

      const results = await axios.get(
        `https://api.foursquare.com/v3/places/search?${searchParams}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: 'fsq38XyJZ6AXlWejpMClNvTsDrdeIoosHP6icQ7QiiDsHuI=',
          },
        }
      );

      const data = results.data;
      const places = data.results.map((place) => ({
        ...place,
        distance: place.distance,
      }));

      setPlaces(places);
      onPlacesUpdate(places);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  return (
    <div>
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </div>
  );
};

export default PlacesSearch;